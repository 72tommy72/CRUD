var productName = document.getElementById("pn")
var productPrice = document.getElementById("pp")
var productCategory = document.getElementById("pc")
var productDes = document.getElementById("pd")

var allProducts = []
var arrayOfProducts = []
var updateIndex;

if (localStorage.getItem("allProducts") != null) {
    allProducts = JSON.parse(localStorage.getItem("allProducts"))
    displayAllProduct(allProducts)
}

function addNewProduct() {
    if (validateProductName() == true) {
        if (document.getElementById('addBtn').innerHTML == "ADD") {
            var product = {
                name: productName.value,
                price: Number(productPrice.value),
                category: productCategory.value,
                description: productDes.value
            }
            allProducts.push(product)

            //local Storage
            localStorage.setItem("allProducts", JSON.stringify(allProducts))

            displayAllProduct(allProducts)
            clearForm()
        } else {
            var product = {

                name: productName.value,
                price: Number(productPrice.value),
                category: productCategory.value,
                description: productDes.value,

            }
            allProducts[updateIndex] = product;
            document.getElementById("addBtn").innerHTML = "ADD";


            localStorage.setItem("allProducts", JSON.stringify(allProducts));

            displayAllProduct()
            deleteElement()


        }
    } else {
        alert('check your name')
    }
}

function displayAllProduct(arrayOfProducts) {
    var cartoona;
    for (let i = 0; i < arrayOfProducts.length; i++) {
        cartoona += `
                <tr>
                    <td>
                        ` + (i + 1) + `
                    </td>
                    <td>
                        ${arrayOfProducts[i].name}
                    </td>
                    <td>
                        ${arrayOfProducts[i].price}
                    </td>
                    <td>
                        ${arrayOfProducts[i].category}
                    </td>
                    <td>
                        ${arrayOfProducts[i].description}
                    </td>
                    <td>
                        <button onclick="updateElement(${i})" class="btn btn-warning btn-md "> Update</button>
                    </td>
                    <td>
                        <button onclick="deleteElement(${i}) " class="btn btn-danger btn-md "> Delete</button>
                    </td>
                </tr>
`
    }

    document.getElementById("tableData").innerHTML = cartoona

}


function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDes.value = "";
}

function deleteElement(index) {

    allProducts.splice(index, 1) //splice the num of index i wanna remove it
        //local Storage
    localStorage.setItem("allProducts", JSON.stringify(allProducts))
    displayAllProduct(allProducts)
}

function searchMethod(term) {
    // var term = document.getElementById('searchInput').value;
    var cartoona;
    var searchedArray = []
    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchedArray.push(allProducts[i])
                //console.log([allProducts[i]]);
                //             cartoona += `
                //                 <tr>
                //                     <td>
                //                         ${i + 1}
                //                     </td>
                //                     <td>
                //                         ${allProducts[i].name}
                //                     </td>
                //                     <td>
                //                         ${allProducts[i].price}
                //                     </td>
                //                     <td>
                //                         ${allProducts[i].category}
                //                     </td>
                //                     <td>
                //                         ${allProducts[i].description}
                //                     </td>
                //                     <td>
                //                         <button onclick="" class="btn btn-warning btn-md "> Update</button>
                //                     </td>
                //                     <td>
                //                         <button onclick="deleteElement(${i}) " class="btn btn-danger btn-md "> Delete</button>
                //                     </td>
                //                 </tr>
                // `
        }
        displayAllProduct(searchedArray)
            // document.getElementById("tableData").innerHTML = cartoona
    }
}

function updateElement(index) {
    productName.value = allProducts[index].name,
        productPrice.value = allProducts[index].price,
        productCategory.value = allProducts[index].category,
        productDes.value = allProducts[index].description
        // console.log('up');
    document.getElementById('addBtn').innerHTML = "UPDATE"
}

function validateProductName() {
    var regex = /^[A-Za-z]{3}$/
    return regex.test(productName.value)
}