function load() {
    Swal.fire({
        title: 'Trang web do Phạm Văn Dã Phát triển hãy nhập vandadeptrai để tiếp tục',
        input: 'text',
        inputPlaceholder: 'Nhập thông tin ở đây...',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
        if (result.isConfirmed) {
            const userInput = result.value;
            if (userInput !== '') {
                if (userInput == "vandadeptrai") {
                    active()
                    Swal.fire('active thành công')
                } else {
                    Swal.fire('Sai Roài')
                }
            } else {
                Swal.fire('Không nhập đừng hòng xài');
            }
        } else {
            Swal.fire('Bạn đã hủy bỏ.');
        }
    });


}

function active() {
    const overlay = document.querySelector('.active');
    overlay.style.display = 'none';
}

function calculate() {
    var input1 = document.getElementById('input1').value;
    var input2 = document.getElementById('input2').value;

    var result = "Kết quả: " + mod(parseInt(input1), parseInt(input2))
    document.getElementById('output').value = result;
}

function mod(number1, number2) {
    if (number1 > 0) return number1 % number2;
    else {
        if (Math.abs(number1) < number2) {
            return (number2 + number1);
        } else {
            let tempnumber = Math.abs(number1);
            return (number2 - (tempnumber - (number2 * parseInt(tempnumber / number2))))
        }
    }
}

function TinhKhaNgich() {
    var SoKhaNgich = document.getElementById('SoKhaNgich').value;
    var ZKhaNghich = document.getElementById('ZKhaNghich').value;
    document.getElementById('outputKhaNgich').value = KhaNgich(SoKhaNgich, ZKhaNghich);
}

function KhaNgich(number1, number2) {
    if (!isCoprime(number1, number2)) {
        return "Không có số khả nghịch";
    }
    var M = parseInt(number2)
    var a = parseInt(number1)
    var Y0 = 0;
    var Y1 = 1;
    var R = mod(M, a)
    var Q = parseInt(M / a)
    var Y = Y0 - (Y1 * Q)
    while (true) {
        M = a;
        a = R;
        Y0 = Y1;
        Y1 = Y;
        R = mod(M, a);
        if (R == 0) {
            break;
        }
        Q = parseInt(M / a)
        Y = Y0 - (Y1 * Q)
    }
    if (Y < 0) {
        Y = mod(Y, parseInt(number2))
    }
    return Y;
}

function isCoprime(a, b) {
    function gcd(x, y) {
        if (y === 0) {
            return x;
        } else {
            return gcd(y, x % y);
        }
    }
    return gcd(a, b) === 1;
}

function EndCode() {
    var txtEndcodeValue = document.getElementById("txt_endcode").value;
    var khoaAValue = document.getElementById("KhoaA").value;
    var khoaBValue = document.getElementById("KhoaB").value;
    var zEndCodeValue = document.getElementById("ZEndCode").value;
    var row1 = document.getElementById("Chu");
    var row2 = document.getElementById("So");
    var tinhmod = document.getElementById("pheptinhmod")
    var chuoiDauTien = chuyenChuoiThanhObject(txtEndcodeValue.toUpperCase());
    tinhmod.innerHTML = `Công thức: e<sub>K</sub>(x) =  ${khoaAValue}x + ${khoaBValue} mod ${zEndCodeValue}`;
    var chuoiEndcode = "";
    var chuoikq = []
    for (let i = 0; i < chuoiDauTien.length; i++) {
        let item = chuoiDauTien[i];
        tinhmod.innerHTML += `<br> e<sub>K</sub>(${item.so}) =  ${khoaAValue}x${item.so} + ${khoaBValue} mod ${zEndCodeValue} = ${mod((parseInt(khoaAValue) * item.so + parseInt(khoaBValue)),zEndCodeValue)}`
        chuoiEndcode += String.fromCharCode(mod((parseInt(khoaAValue) * item.so + parseInt(khoaBValue)), zEndCodeValue) + 65)
        row1.innerHTML += "<td>" + item.ma + "</td>";
        row2.innerHTML += "<td>" + item.ma + "</td>";
        chuoikq.push(mod((parseInt(khoaAValue) * item.so + parseInt(khoaBValue)), zEndCodeValue))
    }
    tinhmod.innerHTML += createHTMLTableFromArray(chuyenSoThanhObject(chuoikq), 2)


    document.getElementById("outputEndcode").value = chuoiEndcode;
}

function DeCode() {
    var txtDeCode = document.getElementById("txt_decode").value;
    var khoaAValue = document.getElementById("KhoaAdecode").value;
    var khoaBValue = document.getElementById("KhoaBdecode").value;
    var zDeCode = document.getElementById("ZdeCode").value;
    var row1 = document.getElementById("Chu1");
    var row2 = document.getElementById("So1");
    var tinhmod = document.getElementById("pheptinhmod1")
    var chuoiDauTien = chuyenChuoiThanhObject(txtDeCode.toUpperCase());
    tinhmod.innerHTML = `Khả nghịch của ${khoaAValue} là: ${KhaNgich(khoaAValue,26)} <br>`
    tinhmod.innerHTML += `Công thức: e<sub>K</sub>(x) =  ${KhaNgich(khoaAValue,26)} x(y - ${khoaBValue}) mod ${zDeCode}`;
    var ChuoiDeCode = "";
    var chuoikq = []
    for (let i = 0; i < chuoiDauTien.length; i++) {
        let item = chuoiDauTien[i];
        tinhmod.innerHTML += `<br> e<sub>K</sub>(${item.so}) =  ${KhaNgich(khoaAValue,26)} x(${item.so} - ${khoaBValue}) mod ${zDeCode} = ${mod((parseInt(KhaNgich(khoaAValue,26)) * ((item.so - parseInt(khoaBValue)))),zDeCode)}`
        ChuoiDeCode += String.fromCharCode(mod((parseInt(KhaNgich(khoaAValue, 26)) * (item.so - parseInt(khoaBValue))), zDeCode) + 65)
        console.log(mod(parseInt(KhaNgich(khoaAValue, 26)) * (item.so - parseInt(khoaBValue)), 26))
        row1.innerHTML += "<td>" + item.ma + "</td>";
        row2.innerHTML += "<td>" + item.so + "</td>";
        chuoikq.push(mod((parseInt(KhaNgich(khoaAValue, 26)) * (item.so - parseInt(khoaBValue))), zDeCode))
    }
    tinhmod.innerHTML += createHTMLTableFromArray(chuyenSoThanhObject(chuoikq), 2)


    document.getElementById("outputdecode").value = ChuoiDeCode;
}

function chuyenChuoiThanhObject(chuoi) {
    var ketQua = [];

    for (var i = 0; i < chuoi.length; i++) {
        var kyTu = chuoi[i];
        var maASCII = chuoi.charCodeAt(i);

        var kyTuObject = {
            ma: kyTu,
            so: (parseInt(maASCII) - 65)
        };

        ketQua.push(kyTuObject);
    }

    return ketQua;
}

function chuyenSoThanhObject(ChuoiSo) {
    var ketQua = [];
    for (var i = 0; i < ChuoiSo.length; i++) {
        var kyTu = String.fromCharCode(ChuoiSo[i] + 65);
        var maASCII = ChuoiSo[i];

        var kyTuObject = {
            ma: kyTu,
            so: maASCII
        };
        ketQua.push(kyTuObject);
    }
    console.log(ketQua)
    return ketQua;
}

function createHTMLTableFromArray(arr, kieu) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return ''; // Trả về chuỗi trống nếu mảng không hợp lệ hoặc rỗng
    }
    var html = "<table class='table table-bordered'>"
    var row1 = "<tr> <td>Chữ</td>"
    var row2 = "<tr> <td>Số </td>"
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        row1 += "<td>" + item.ma + "</td>";
        row2 += "<td>" + item.so + "</td>"
    }
    row1 += "</td>"
    row2 += "</td>"
    if (kieu === 1) {
        html += row1;
        html += row2;
    } else {
        html += row2;
        html += row1;
    }

    html += "</table>"
    return html;
}