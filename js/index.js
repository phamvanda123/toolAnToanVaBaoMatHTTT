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