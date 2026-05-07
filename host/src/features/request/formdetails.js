export default [
    { 
        formName: "", //OJCE User
        type: "NEW",
        department: "",
        details: [
            {name: "Full Name", placeholder: "New User Full Name (as per Iqama)"},
            {name: "department", placeholder: "Department"},
            {name: "desigination", placeholder: "Job Role"},
            {name: "email", placeholder: "Email Address"}, 
            {name: "mobile", placeholder: "Mobile Number"}, 
        ]
    },
    { 
        formName: "OJCE User", //IT Products
        type: "NEW",
        department: "",
        details: [
            {name: "requestor", placeholder: "Requested For (Full Name)"}, 
            {name: "department", placeholder: "Department To"}, 
            {name: "item", data: [{name: "itemDescription", placeholder: "Description of Item"}, {name: "reference", placeholder: "Specification Ref."}, {name: "quantity", placeholder: "Quantity"}]}
        ]
    },
    { 
        formName: "Lab Equipments",
        type: "new",
        department: "",
        details: [
            {name: "department", placeholder: "Department To"}, 
            {
                name: 'item', 
                data: [{name: "itemDescription", placeholder: "Description of Item"}, {name: "quantity", placeholder: "Quantity"}, {name: 'requiredon', placeholder: 'Required Date'}, {name: "reference", placeholder: "Specification Ref."}, {name: 'accuracy', placeholder: 'Accuracy'}, {name: 'Capacity', placeholder: 'Capacity'}],
                specific: [{name: "reference", placeholder: "Specification Ref."}, {name: 'accuracy', placeholder: 'Accuracy'}, {name: 'Capacity', placeholder: 'Capacity'}],
                remark: ''
            }
        ]
    },
    { 
        formName: "IT Products",
        type: "new",
        department: "",
        details: [
            {name: "department", placeholder: "Department To"}, 
            {
                name: 'item', 
                data: [{name: "itemDescription", placeholder: "Description of Item"}, {name: "quantity", placeholder: "Quantity"}, {name: 'requiredon', placeholder: 'Required Date'}, {name: "reference", placeholder: "Specification Ref."}, {name: 'accuracy', placeholder: 'Accuracy'}, {name: 'Capacity', placeholder: 'Capacity'}],
                specific: [],
                remark: ''
            }
        ]
    },
]
