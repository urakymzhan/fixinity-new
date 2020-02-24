CRUD PROJECT:

customer sample: {
    Name: "",
    Phone: "",
    ZIP: "",
    VIN: "",
    Status: "Active"
}
Action: edit(url(id)), 
        delete function(pass id to delete)

<!-- where state lives -->
this.state = {
    customers: [],
    currentPage: 1,
    rowsPerPage: 10,
}

<!-- Components -->
1. Add New Customer
2. List Of Customers
    1. Status
    2. Action (how deep we want to go. We can simply put icon)
        1. Edit
        2. Delete
3. Pagination
4. Update Customer/Add. New Customer
    1. this.state = {currentCustomer: {} }
5. Login UI

URLS:
    1. Add new member - customer/add
    2. Edit customer - customer/edit

    When hit Action go to new URL and 
    use withRouter to get the ID when update  (match.params...);

    we needs to create UpdatingData/CurrentCustomer dirty data. Otherwise when we cancel it will update the customer.  

<!-- Use localStorage if data to be persistent -->

LOGIN/LOGOUT usually server side in real job
If stored on state it will ask again to login after each refresh
Ideally they stored in cookies. In first login it will ask for username/password but in refresh token/hash key value (jwt auth example) that expires.