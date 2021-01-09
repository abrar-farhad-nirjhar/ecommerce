
console.log("hello world")
let imageArray = null
const changeImage = (id) => {
    imageArray.forEach((element) => {
        if (element.pk === parseInt(id)) {
            document.getElementById('p-image').innerHTML = element.fields.svg
        }
    })

    pathSelector()
}

const showChange = () => {
    console.log(document.getElementById('options'))
    document.getElementById('options').innerHTML = '<option>Hello </option>'

}

let selected_segment = null
// showChange()
const pathSelector = () => {

    let paths = document.getElementById('p-image').getElementsByTagName('path')
    // console.log
    paths = Array.prototype.slice.call(paths)
    display = ''
    paths.forEach((path) => {

        if (path.id.length > 0) {
            display += `
            <option value='${path.id}'>${path.id}</option>
            `
        }

    })
    display = '<select style="display:block" id="segment-selector">' + display + '</select>'
    // console.log(display)
    document.getElementById('options').innerHTML = display

    texts = document.getElementById('p-image').getElementsByTagName('text')

    texts = Array.prototype.slice.call(texts)
    if (texts.length > 0) {
        document.getElementById('if-texts-present').innerHTML = '<h5>Change Text</h5>'
    }
    else {
        document.getElementById('if-texts-present').innerHTML = ""
    }
    text_display = ''
    console.log(texts)


    texts.forEach((element) => {

        text_display += `<input type="text" id='${element.id}change' value='${element.innerHTML}'  placeholder="Input text to change text in the image"/>`

    })
    document.getElementById('texts').innerHTML = text_display

    texts.forEach((element) => {
        document.getElementById(element.id + 'change').addEventListener('keyup', (e) => {
            document.getElementById(element.id).innerHTML = e.target.value
        })
    })


    document.getElementById('options').addEventListener('change', (e) => {
        // console.log(e.target.value)
        selected_segment = e.target.value


    })




}

let productId = window.location.href.split('/').pop()
let selectedDiv = null
fetch('/images/' + productId)
    .then(response => response.json())
    .then(data => {


        imageArray = JSON.parse(data.images)
        console.log(imageArray)
        display = ''
        imageArray.forEach((element, index) => {
            // display += `

            // <div class="svg-container center-align" id="${element.fields.face}-svg-image" >
            // <div style="background-color:white; min-height:30px; width:100%; position:relative; top:21px"></div>
            //    ${element.fields.svg}

            //     <div class="face-container">${element.fields.face}</div>
            // </div>



            // `

            display += `

            <div class="col s3" onclick="changeImage('${element.pk}')">
                  <div class="product-sub-image" style="width:100%;height:100%">
                    ${element.fields.svg}
                    <span>${element.fields.face}</span>
                  </div>
                </div>

            `


            if (index === 0) {
                document.getElementById('p-image').innerHTML = element.fields.svg
            }

        });
        document.getElementById('sub-images').innerHTML = display
        pathSelector()


        try {
            // document.getElementById('back-svg-image').hidden = true
        }
        catch {

        }


    });


// document.body.addEventListener('click', (e) => {
//     console.log(e.target)
//     selectedDiv = e.target
// })

// var colorPicker = new iro.ColorPicker('#picker');

// colorPicker.on('color:change', function (color) {
//     // log the current color as a HEX string
//     console.log(color.hexString);
//     selectedDiv.style.fill = color.hexString + ''
// });


const changeColor = (hex) => {
    if (selected_segment) {
        document.getElementById(selected_segment).style.fill = hex
    }
    console.log(hex)
}
// console.log(colorPicker)

