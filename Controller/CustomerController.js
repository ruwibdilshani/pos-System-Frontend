import {
  getAllCustomers,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
} from "../model/CustomerModel.js";

function loadAllCustomers(customers) {
  const tbody = $("#cus-tbl");
  tbody.empty();

  customers.forEach((customer) => {
    const row = `<tr>
            <td>${customer.cusId}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
        </tr>`;
    tbody.append(row);
  });
}

$(document).ready(async function () {
  const customers = await getAllCustomers();
  loadAllCustomers(customers);
});

document
  .querySelector("#CustomerManage #customerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

var cusId;
var name;
var address;
var salary;

$("#CustomerManage .saveBtn").click(async function () {
  cusId = $("#CustomerManage .custId").val();
  name = $("#CustomerManage .custName").val();
  address = $("#CustomerManage .custAddress").val();
  salary = $("#CustomerManage .custSalary").val();

  let customer = {
    cusId: cusId,
    name: name,
    address: address,
    salary: salary,
  };

  let validResult = validate(customer);

  if (validResult) {
    try {
      await saveCustomer(customer);
      alert("Customer Saved Successfully!");
      //   refresh();
    } catch (error) {
      alert("Failed to save customer.");
    }
  }
});

function validate(customer) {
  let valid = true;

  if (/^C0[0-9]+$/.test(customer.cusId)) {
    $("#CustomerManage .invalidCustId").text("");
  } else {
    $("#CustomerManage .invalidCustId").text("Invalid Customer Id !!");
    valid = false;
  }

  if (/^(?:[A-Z][a-z]*)(?: [A-Z][a-z]*)*$/.test(customer.name)) {
    $("#CustomerManage .invalidCustName").text("");
  } else {
    $("#CustomerManage .invalidCustName").text("Invalid Customer Name !!");
    valid = false;
  }

  if (/^[A-Z][a-z, ]+$/.test(customer.address)) {
    $("#CustomerManage .invalidCustAddress").text("");
  } else {
    $("#CustomerManage .invalidCustAddress").text(
      "Invalid Customer Address !!"
    );
    valid = false;
  }

  if (customer.salary != null && customer.salary > 0) {
    $("#CustomerManage .invalidCustSalary").text("");
  } else {
    $("#CustomerManage .invalidCustSalary").text("Invalid Customer Salary !!");
    valid = false;
  }

  let customers = getAllCustomers();
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].custd === customer.cusId) {
      $("#CustomerManage .invalidCustId").text("Customer Id Already Exists !!");
      valid = false;
    }
  }

  return valid;
}

function loadTable(customer) {
  $("#CustomerManage .tableRow").append(
    `<tr>
            <td>${customer.custId}</td>
            <td>${customer.custName}</td>
            <td>${customer.custAddress}</td>
            <td>${customer.custSalary}</td>
        </tr>`
  );
}

function extractNumber(id) {
  var match = id.match(/C0(\d+)/);
  if (match && match.length > 1) {
    return parseInt(match[1]);
  }
  return null;
}

function createCustomerId() {
  let customers = getAllCustomers();

  if (!customers || customers.length === 0) {
    return "C01";
  } else {
    let lastCustomer = customers[customers.length - 1];
    let id = lastCustomer && lastCustomer.custId ? lastCustomer.custId : "C00";

    let number = extractNumber(id);
    number++;
    return "C0" + number;
  }
}

function refresh() {
  $("#CustomerManage .custId").val(createCustomerId());
  $("#CustomerManage .custName").val("");
  $("#CustomerManage .custAddress").val("");
  $("#CustomerManage .custSalary").val("");
  $("#CustomerManage .invalidCustId").text("");
  $("#CustomerManage .invalidCustName").text("");
  $("#CustomerManage .invalidCustAddress").text("");
  $("#CustomerManage .invalidCustSalary").text("");
  getAllCustomers().then((customers) => {
    $(".counts .customers h2").text(customers.length);
    reloadTable(customers);
  });
}

$("#CustomerManage .clearBtn").click(function () {
  refresh();
});

$("#CustomerManage .searchBtn").click(function () {
  let customer = searchCustomer($("#CustomerManage .custId").val());
  if (customer) {
    $("#CustomerManage .custName").val(customer.custName);
    $("#CustomerManage .custAddress").val(customer.custAddress);
    $("#CustomerManage .custSalary").val(customer.custSalary);
  } else {
    alert("Customer Not Found !!");
  }
});

function searchCustomer(id) {
  let customers = getAllCustomers();
  let customer = customers.find((c) => c.custId === id);
  return customer;
}

$("#CustomerManage .updateBtn").click(async function () {
  let UpdateCustomer = {
    custId: $("#CustomerManage .custId").val(),
    custName: $("#CustomerManage .custName").val(),
    custAddress: $("#CustomerManage .custAddress").val(),
    custSalary: $("#CustomerManage .custSalary").val(),
  };

  let validResult = validate(UpdateCustomer);

  if (validResult) {
    try {
      await updateCustomer(UpdateCustomer.custId, UpdateCustomer);
      alert("Customer Updated Successfully!");
      refresh();
    } catch (error) {
      alert("Failed to update customer.");
    }
  }
});

function reloadTable(customers) {
  $("#CustomerManage .tableRow").empty();
  customers.forEach((c) => {
    loadTable(c);
  });
}

$("#CustomerManage .removeBtn").click(async function () {
  let id = $("#CustomerManage .custId").val();

  try {
    await deleteCustomer(id);
    alert("Customer Deleted Successfully!");
    refresh();
  } catch (error) {
    alert("Failed to delete customer.");
  }
});

$("#CustomerManage .tableRow").on("click", "tr", function () {
  let id = $(this).children("td:eq(0)").text();
  let name = $(this).children("td:eq(1)").text();
  let address = $(this).children("td:eq(2)").text();
  let salary = $(this).children("td:eq(3)").text();

  $("#CustomerManage .custId").val(id);
  $("#CustomerManage .custName").val(name);
  $("#CustomerManage .custAddress").val(address);
  $("#CustomerManage .custSalary").val(salary);
});
