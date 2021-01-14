console.log("hello world")
let imageArray = null
const changeImage = (id) => {
    console.log(current_face)
    document.getElementById(current_face).innerHTML = `<div class="product-sub-image" style="width:100%;height:100%">
    <div class="svg-container">    
    ${document.getElementById('p-image').innerHTML}
    </div>
    <span>${current_face}</span>
  </div>`
    imageArray.forEach((element) => {
        if (element.pk === parseInt(id)) {
            document.getElementById('p-image').innerHTML = document.getElementById(element.fields.face).getElementsByClassName('svg-container')[0].innerHTML
            current_face = element.fields.face
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
    display = '<select style="display:block" id="segment-selector">' + `<option value="" disabled selected>
    Choose your option
  </option>` + display + '</select>'
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
        console.log(e.target.value)
        selected_segment = e.target.value
        document.getElementById(selected_segment).style.fillOpacity = '0.5'
    })
}
let current_face = ''
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
            <div class="col s3" id='${element.fields.face}' onclick="changeImage('${element.pk}')">
                  <div class="product-sub-image" style="width:100%;height:100%">
                  <div class="svg-container">
                    ${element.fields.svg}
                    </div>
                    <span>${element.fields.face}</span>
                  </div>
                </div>
            `
            if (index === 0) {
                document.getElementById('p-image').innerHTML = element.fields.svg
                current_face = element.fields.face
            }
        });
        document.getElementById('sub-images').innerHTML = display
        pathSelector()
        try {
        }
        catch {
        }
    });
function svg2img() {
    var svg = document.getElementById('p-image').querySelector('svg');
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(xml);
    var b64start = 'data:image/svg+xml;base64,';
    var image64 = b64start + svg64;
    return image64;
};
function newsvg2img(svg) {
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(xml);
    var b64start = 'data:image/svg+xml;base64,';
    var image64 = b64start + svg64;
    return image64;
};
const changeColor = (hex) => {
    if (selected_segment) {
        document.getElementById(selected_segment).style.fill = hex
        document.getElementById(selected_segment).style.fillOpacity = '1'
    }
    document.getElementById(current_face).innerHTML = `<div class="product-sub-image" style="width:100%;height:100%">
    <div class="svg-container">    
    ${document.getElementById('p-image').innerHTML}
    </div>
    <span>${current_face}</span>
  </div>`
    console.log(hex)
}
function rgba2hex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}
document.getElementById('add-to-cart').addEventListener('click', () => {
    console.log(productId)
    svgs = document.getElementById('sub-images').getElementsByTagName('svg')
    svgs = Array.prototype.slice.call(svgs)
    front = ''
    back = ''
    side = ''
    try {
        front = newsvg2img(svgs[0])
    }
    catch {
        console.log('no front')
    }
    try {
        back = newsvg2img(svgs[1])
    }
    catch {
        console.log('no back')
    }
    let front_details = {}
    front_paths = Array.prototype.slice.call(svgs[0].getElementsByTagName('path'))
    front_paths.forEach((element) => {
        console.log(element.style.fill)
        if (element.style.fill.substr(0, 1) === 'r') {
            front_details[element.id] = rgba2hex(element.style.fill)
        }
    })
    let back_details = {}
    back_paths = Array.prototype.slice.call(svgs[1].getElementsByTagName('path'))
    back_paths.forEach((element) => {
        console.log(element.style.fill)
        if (element.style.fill.substr(0, 1) === 'r') {
            back_details[element.id] = rgba2hex(element.style.fill)
        }
    })
    side = {
        front_details,
        back_details
    }
    fetch('/addtocart', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId, quantity: parseInt(document.getElementById('quantity').value), preview: svg2img(), front, back, side: JSON.stringify(side) }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})