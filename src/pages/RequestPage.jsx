import React from "react";

function RequestPage({ packages, request, setRequest, createOrder }) {
  return (
    <section className="section booking" id="request">
      <div>
        <span className="eyebrow">Customer request</span>
        <h2>Order a package.</h2>
        <p>Customers submit requests here. Agents can review them in the dashboard below.</p>
      </div>

      <form className="panel" onSubmit={createOrder}>
        <select value={request.package_id} onChange={(event) => setRequest({ ...request, package_id: event.target.value })} required>
          <option value="">Select package</option>
          {packages.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name} - {item.place}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={request.travel_date}
          onChange={(event) => setRequest({ ...request, travel_date: event.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="People"
          value={request.people}
          onChange={(event) => setRequest({ ...request, people: event.target.value })}
          required
        />
        <input
          placeholder="Phone number"
          value={request.phone}
          onChange={(event) => setRequest({ ...request, phone: event.target.value })}
          required
        />
        <textarea
          placeholder="Message or special request"
          value={request.note}
          onChange={(event) => setRequest({ ...request, note: event.target.value })}
        />

        <button className="primary" type="submit">Send request</button>
      </form>
    </section>
  );
}

export default RequestPage;
