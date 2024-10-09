function getData() {
    if (!localStorage.getItem('markerGeojson')) {
        localStorage.setItem('markerGeojson', '[]');
    }
    return JSON.parse(localStorage.getItem('markerGeojson'));
}

function saveData(data) {
    localStorage.setItem('markerGeojson', JSON.stringify(data));
}

function loadData() {
    const localstorage = getData();
    localstorage = []
    localstorage.forEach((item) => {
        var marker0 = new AMap.Marker({
            position: item,
        });
        map.add(marker0);
    });
}


function clearLocalStorage() {
    localStorage.setItem('markerGeojson', '[]')
}


// // 切换子复选框的显示和隐藏
// function toggleSubCheckboxes(mainCheckbox) {
//     const checkboxGroup = mainCheckbox.parentElement;
//     checkboxGroup.classList.toggle('expanded');
//     console.log(checkboxGroup)
// }


// function addBasicPlugins() {
//     AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation',
//         'AMap.MapType', 'AMap.LineSearch', 'AMap.Weather', 'AMap.GeoJSON'], function () {
//             var toolbar = new AMap.ToolBar(); //缩放工具条实例化
//             var scale = new AMap.Scale();
//             var geolocation = new AMap.Geolocation();
//             var maptype = new AMap.MapType();
//             var linesearch = new AMap.LineSearch();

//             map.addControl(toolbar); //添加控件
//             map.addControl(scale);
//             // map.addControl(geolocation);
//             map.addControl(maptype)

//         });
// }



function addschoolPosition(){
    
}

function addNowPosition(){

}

