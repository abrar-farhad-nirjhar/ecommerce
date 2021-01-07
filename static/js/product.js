

let productId = window.location.href.split('/').pop()
let selectedDiv = null
fetch('/images/' + productId)
    .then(response => response.json())
    .then(data => {
        let imageArray = JSON.parse(data.images)
        console.log(imageArray)
        display = ''
        imageArray.forEach(element => {
            display += `

            <div class="svg-container center-align" id="${element.fields.face}-svg-image" >
            <div style="background-color:white; min-height:30px; width:100%; position:relative; top:21px"></div>
               ${element.fields.svg}

                <div class="face-container">${element.fields.face}</div>
            </div>
            
            `
        });
        document.getElementById('svgimages').innerHTML = display

        try {
            // document.getElementById('back-svg-image').hidden = true
        }
        catch {

        }


    });


document.body.addEventListener('click', (e) => {
    console.log(e.target)
    selectedDiv = e.target
})

var colorPicker = new iro.ColorPicker('#picker');

colorPicker.on('color:change', function (color) {
    // log the current color as a HEX string
    console.log(color.hexString);
    selectedDiv.style.fill = color.hexString + ''
});

console.log(colorPicker)