const backendUrl =
  "http://localhost:8080/Pos_System_Backend_war_exploded/customer";

export async function getAllCustomers() {
  try {
    const response = await fetch(backendUrl);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function saveCustomer(newCustomer) {
  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) throw new Error("Failed to add customer.");
    const customer = await response.json();
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCustomer(cusId, updatedCustomer) {
  try {
    const response = await fetch(`${backendUrl}/${cusId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update customer: ${errorText}`);
    }

    const customer = await response.json();
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCustomer(cusId) {
  try {
    const response = await fetch(`${backendUrl}/${cusId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete customer");
  } catch (error) {
    console.error(error);
    throw error;
  }
}
