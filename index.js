// Create add to cart buttons
for (var i = 0; i < document.querySelectorAll(".item").length; i++) {
    document.querySelectorAll(".add-to-cart")[i].addEventListener("click", function () {
        var itemName = this.id;
        var currentAmount = Number(localStorage.getItem(itemName));
        console.log(currentAmount);
        if (currentAmount) {
            localStorage.setItem(itemName, currentAmount + 1);
        } else {
            localStorage.setItem(itemName, 1);
        }
    })
}

// Display a cart
var itemList = [];
var totalAmount = 0;
Object.keys(localStorage).forEach(key => {
    itemList.push({[key]: localStorage.getItem(key)});
    switch (key) {
        case ("americano"):
            totalAmount += 400 * localStorage.getItem(key);
            break;
        case ("caffe-latte"):
            totalAmount += 450 * localStorage.getItem(key);
            break;
        case ("cappuccino"):
            totalAmount += 450 * localStorage.getItem(key);
            break;
        case ("cold-brew"):
            totalAmount += 500 * localStorage.getItem(key);
            break;
        case ("espresso"):
            totalAmount += 300 * localStorage.getItem(key);
            break;
        case ("flat-white"):
            totalAmount += 500 * localStorage.getItem(key);
            break;
        case ("ice-coffee"):
            totalAmount += 400 * localStorage.getItem(key);
            break;
        case ("macchiato"):
            totalAmount += 400 * localStorage.getItem(key);
            break;
        case ("mocha"):
            totalAmount += 500 * localStorage.getItem(key);
            break;
        default:
            console.log(key);
    }
});

// Add to html
var productListHtml = itemList
    .map(item => `<li class="product">
                        ${Object.keys(item)[0].replace("-", " ").charAt(0).toUpperCase() + Object.keys(item)[0].replace("-", " ").slice(1)}
                        <div class="amount-box">
                            <button id="${Object.keys(item)[0]}" class="minus" onclick="reduce(event)">-</button>
                            <p>${item[Object.keys(item)[0]]}</p>
                            <button id="${Object.keys(item)[0]}" class="plus" onclick="increase(event)">+</button>
                        </div>
                    </li>`)
    .join("");
var totalAmountHtml = `<hr/><li>Total: ¥${totalAmount}</li>`
document.querySelector(".product-list").innerHTML = productListHtml + totalAmountHtml;

// Checkout
function checkout() {
    localStorage.clear();
    window.location.reload();
}
function reduce(event) {
    var itemName = event.target.id;
    var currentAmount = Number(localStorage.getItem(itemName));
    if (currentAmount > 0) {
        localStorage.setItem(itemName, currentAmount - 1);
    }
    window.location.reload();
}
function increase(event) {
    var itemName = event.target.id;
    var currentAmount = Number(localStorage.getItem(itemName));
    localStorage.setItem(itemName, currentAmount + 1);
    window.location.reload();
}
