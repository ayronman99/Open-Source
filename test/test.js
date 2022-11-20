let count = 10;
let isDownload = false;
let options = {
    orientation: "p",  // p, l
    unit: 'mm',
    format: [1231, 1212],   //a4 b3 [1231,1212]
    precision: 1,
    compress: true
}
const pdf = new jsPDF(options);

let testArr = [];
const testThis = () => {
    for (let i = 0; i < count; i++) {
        console.log("this is the current loop count:", i)
        testArr.push(`<div class="card" style="width: 18rem;">
        <img src=${"https://images.pexels.com/photos/13806105/pexels-photo-13806105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} class="card-img-top" alt="test${i}">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`);
    }
}
testThis();

window.addEventListener("DOMContentLoaded", () => {
    const addThisToDom = testArr.map(items => {
        return items;
    })
    document.getElementById("test-handler").innerHTML = addThisToDom;
})

function createPDF() {
    try {
        const tagToScreenShot = document.getElementsByClassName("card");
        const totalDocs = tagToScreenShot.length;
        let canvasOptions = {
            scale: 3,
            backgroundColor: null,
            allowTainted: true,
            imageTimeOut: 500,
            useCORS: true
        }

        pdf.internal.scaleFactor = 30;
        let pdfInternals = pdf.internal,
            pdfPageSize = pdfInternals.pageSize,
            pdfPageWidth = pdfPageSize.width,
            pdfPageHeight = pdfPageSize.height;
        console.log("doesnt work");
        Object.values(tagToScreenShot).map(async (items, index) => {
            try {
                await html2canvas(items, canvasOptions).then(canvas => {
                    console.log("html2canvas", index)
                    let data = canvas.toDataURL("img/png");
                    console.log("addImage", index)
                    pdf.addImage(data, "png", 0, 0, pdfPageWidth, pdfPageHeight, "a" + index);
                    console.log("addPage", index)
                    if (index < totalDocs - 1) pdf.addPage();
                    if (index == totalDocs - 1) pdf.save("pdfTest");
                })
            } catch (e) {
                console.error(e.message);
            }
        })
    } catch (e) {
        console.error(e.message);
    }
}