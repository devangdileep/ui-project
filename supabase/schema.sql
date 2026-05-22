create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  role text not null default 'customer' check (role in ('customer', 'agent')),
  created_at timestamptz not null default now()
);

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  place text not null,
  type text not null,
  days integer not null check (days > 0),
  price integer not null check (price > 0),
  rating numeric(2, 1) not null default 4.7,
  image text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  customer_id uuid not null references auth.users(id) on delete cascade,
  customer_name text not null,
  customer_email text not null,
  phone text not null,
  travel_date date not null,
  people integer not null default 1 check (people > 0),
  note text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now()
);

create or replace function public.is_agent(user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id and role = 'agent'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    case
      when new.raw_user_meta_data->>'role' = 'agent' then 'agent'
      else 'customer'
    end
  )
  on conflict (id) do update
    set email = excluded.email,
        name = excluded.name,
        role = excluded.role;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.packages enable row level security;
alter table public.orders enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "create own profile" on public.profiles;
create policy "create own profile"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "everyone can read packages" on public.packages;
create policy "everyone can read packages"
on public.packages for select
using (true);

drop policy if exists "agents can add packages" on public.packages;
create policy "agents can add packages"
on public.packages for insert
with check (public.is_agent());

drop policy if exists "agents can update packages" on public.packages;
create policy "agents can update packages"
on public.packages for update
using (public.is_agent())
with check (public.is_agent());

drop policy if exists "agents can delete packages" on public.packages;
create policy "agents can delete packages"
on public.packages for delete
using (public.is_agent());

drop policy if exists "customers can create own orders" on public.orders;
create policy "customers can create own orders"
on public.orders for insert
with check (auth.uid() = customer_id);

drop policy if exists "customers see own orders agents see all" on public.orders;
create policy "customers see own orders agents see all"
on public.orders for select
using (auth.uid() = customer_id or public.is_agent());

drop policy if exists "agents update order status" on public.orders;
create policy "agents update order status"
on public.orders for update
using (public.is_agent())
with check (public.is_agent());

insert into public.packages (name, place, type, days, price, rating, image, description)
values
  (
    'Himalayan Escape',
    'Manali, India',
    'Mountains',
    5,
    12999,
    4.9,
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    'Snow views, cozy stays, sightseeing, and guided local travel.'
  ),
  (
    'Beach Bliss',
    'Goa, India',
    'Beaches',
    4,
    8999,
    4.7,
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    'Beach resorts, water activities, nightlife, and relaxed transfers.'
  ),
  (
    'Royal Rajasthan',
    'Jaipur, India',
    'Culture',
    3,
    7499,
    4.8,
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80',
    'Palaces, forts, markets, local food, and heritage city tours.'
  ),
  (
    'Kerala Backwaters',
    'Alleppey, India',
    'Nature',
    6,
    14999,
    4.9,
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    'Houseboat stay, green villages, local meals, and calm waterways.'
  )
on conflict do nothing;
