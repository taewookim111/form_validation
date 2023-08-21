/*
validation : 인증함수, 개발자가 정한 값과 사용자가 작성한 값이
일치하는지는 알아보는 함수
조건을 정해서 만족하면 return ture
조건을 정해서 만족하지 않으면 return false

평가하는 시점 : sunmit버튼을 클릭할때
인증함수의 결과 값이 하나라도 false이면, action으로 넘어가지 못하게
e.preventDefault();를 작성합니다
모두 참이면 그때 action으로 이동합니다
*/

//변수지정
//전역변수,지역변수
const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

let toggleBtn = document.getElementById("toggleBtn");
let pwd = document.querySelector("#pwd1");



btnSubmit.addEventListener("click", (e) => {

    //각각의 input요소를 validation할 함수를 조건문으로 
    //값이 잘 적용되는지를 판단해서 action으로 넘길지 말지를 결정
    if (!isTxt("userid", 5)) e.preventDefault();
    if (!isTxt("comments", 20)) e.preventDefault();

    if (!isEmail("email")) e.preventDefault();

    if (!isCheck("gender")) e.preventDefault();
    if (!isCheck("hobby")) e.preventDefault();

    if (!isSelected("education")) e.preventDefault();

    if (!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
})

console.log(form.querySelectorAll("p"));
//1. type이 text인 form요소 인증함수
function isTxt(el, len) {
    //지역변수로 - userid영역을 변수지정

    let input = form.querySelector(`[name=${el}]`);
    let txt = input.value;
    console.log(txt);
    //txt에다 input에 사용자가 작성한 값을 담아서
    //txt의 길이를 측정해서 개발자가 원하는 글자수가 맞는지를 
    //판단하는코드를 작성합니다

    // if(글자수가 맞는지?){
    //     맞으면 return true;
    // }else{
    //     틀리면 
    //     경고문구도 출력해서 만들고
    //     return false;
    // }

    if (txt.length >= len) {
        //중첩되어있는 p요소가 있는지 판별하고
        const isErrMsg = input.closest("td").querySelectorAll("p");
        //isErrMsg.length > 0이 적용되려면 배열의 형태에서 길이를
        //물어보는 조건식이어야합니다
        //있으면 제거하고
        console.log(isErrMsg);
        if (isErrMsg.length > 0) {
            input.closest("td").querySelector("p").remove();
            // input.closest("td").querySelectorAll("p").remove();
            //querySelectorAll은 유사배열로 반환되며 배열에는
            //remove()매소드가 적용될수 없기 때문에
            // querySelector로 찾아서 지워야합니다
        }
        //ture를 반환
        return true;
    } else {
        /*
        완전 처음, 글자수가 5자 미만이면 
        1구간의 코드는 p태그가 현재 없으므로 무시됩니다
        그리고 2구간으로 넘어가서 p태그를 생성하고 에러메세지를 작성

        이후 에러메세지가 있는 상태에서 버튼을 다시 눌렀을경우
        p태그가 있는 상태이므로 1구간이 무시되지 않고
        1구간이 작동됩니다 이때 return을 만나 
        return false;로 false가 반환되면 이때 return으로 인하여
        이하의 2구간은 무시됩니다
        이로인해 p태그 중첩이 해결됩니다
        */


        //1구간
        //중첩되어있는 p요소가,에러메세지가 있는지 판별하고
        const isErrMsg = input.closest("td").querySelectorAll("p");
        //있으면 제거하고 -> 제거할 필요없이 그대로 두고
        //false만 반환한다
        if (isErrMsg.length > 0) return false;


        //2구간
        //경고문구를 출력해야합니다
        const errMsg = document.createElement("p");
        //p태그를 문서에서 생성합니다
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
        //p태그안에 글자내용이 넣어져있습니다
        input.closest("td").append(errMsg);
        //위에서 만든 p태그를 해당지역변수 input아래에 넣어야하므로
        //td를 찾아서 td맨뒤에 appent로 넣어줍니다

        return false;
    }
}

//2. type이 text인데 email인증함수
function isEmail(el) {
    let input = form.querySelector(`[name=${el}]`);
    let txt = input.value;

    //조건문 @이가 있는지 없는지??
    //정규식??
    if (/@/.test(txt)) {
        const isErrMsg = input.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) {
            input.closest("td").querySelector("p").remove();
        }
        return true;
    } else {
        const isErrMsg = input.closest("td").querySelectorAll("p");

        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
        input.closest("td").append(errMsg);

        return false;
    }
}

//3. type이 checkbox, radio 인증함수 = checked확인 함수
function isCheck(el) {
    //여러가지를 체크했을 수 있으므로 all로 가지고와야합니다
    let inputs = form.querySelectorAll(`[name=${el}]`);
    let isChecked = false;

    for (let el of inputs) {
        if (el.checked) isChecked = true;
    }

    if (isChecked) {
        const isErrMsg = inputs[0].closest("td").querySelectorAll("p");

        if (isErrMsg.length > 0) inputs.closest("td").querySelector("p").remove();

        return true;
    } else {

        const isErrMsg = inputs[0].closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("필수 입력항목을 체크해주세요");
        inputs[0].closest("td").append(errMsg);

        return false;
    }

}

//4. select인증함수
function isSelected(el) {
    let input = form.querySelector(`[name=${el}]`);
    let select_index = input.options.selectedIndex;
    // console.log(select_index); 
    let value = input[select_index].value;
    //배열이 아닌데 input[]배열의 형태로 검색하는 이유
    //select태그는 안에 option들을 배열의 형태로 검색가능함

    if (value !== "") {
        const isErrMsg = input.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    } else {
        const isErrMsg = input.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("항목을 선택해주세요");
        input.closest("td").append(errMsg);

        return false;
    }
}

//5. 비밀번호 인증함수
// function isPwd(el1, el2, len) {
//     let pwd1 = form.querySelector(`[name=${el1}]`);
//     let pwd2 = form.querySelector(`[name=${el2}]`);
//     let pwd1_value = pwd1.value;
//     let pwd2_value = pwd2.value;

//     //개발자가 비교할 정규식을 변수로 저장
//     const num = /[0-9]/;
//     const eng = /[a-zA-Z]/;
//     const spc = /[~!@#$%^&*()_+?><]/;

//     /*
//     //조건식 
//     //두개의 비밀번호가 같고 
//     pwd1_value === pwd2_value
//     //(그리고) 비밀번호의 글자수가 len개 이상
//     pwd1_value.length >= len
//     //(그리고) 비밀번호에 num을 포함하고
//     num.test(pwd1_value)
//     //(그리고) 비밀번호에 eng을 포함하고
//     eng.test(pwd1_value)
//     //(그리고) 비밀번호에 spc를 포함하는 값
//     spc.test(pwd1_value)
//     */
//     if (pwd1_value === pwd2_value
//         && pwd1_value.length >= len
//         && num.test(pwd1_value)
//         && eng.test(pwd1_value)
//         && spc.test(pwd1_value)) {

//         const isErrMsg = pwd1.closest("td").querySelectorAll("p");
//         if (isErrMsg.length > 0) pwd1.closest("td").querySelector("p").remove();
//         return true;
//     } else {
//         const isErrMsg = pwd1.closest("td").querySelectorAll("p");
//         if (isErrMsg.length > 0) return false;

//         const errMsg = document.createElement("p");
//         errMsg.append(`비밀번호는 ${len}글자 이상,
//          영문, 숫자, 특수문자를 포함하여야 합니다`);
//         pwd1.closest("td").append(errMsg);

//         return false;
//     }
// }
// 6. 비밀번호 인증함수 - 케이스별로 오류메세지 반환하기
function isPwd(el1, el2, len) {
    let pwd1 = form.querySelector(`[name=${el1}]`);
    let pwd2 = form.querySelector(`[name=${el2}]`);
    let pwd1_value = pwd1.value;
    let pwd2_value = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+?><]/;

    //오류메세지가 존재하는 공간을 변수에 담는것
    const errMsgWrap = pwd1.closest("td");

    //오류메세지 삭제 함수
    function removeErr() {
        const errMsg = errMsgWrap.querySelector("p");
        if (errMsg) {
            errMsg.remove();
        }
    }
    //오류메세지 생성 함수
    function addErr(msg) {
        const errMsg = document.createElement("p");
        errMsg.textContent = msg;
        //textContent 는 텍스트를 넣을때 사용하는 속성
        errMsgWrap.append(errMsg);
        //append()는 부모요소 안쪽 가장 끝에 무엇이든지 넣는 메소드
    }



    if (pwd1_value === pwd2_value
        && pwd1_value.length >= len
        && num.test(pwd1_value)
        && eng.test(pwd1_value)
        && spc.test(pwd1_value)) {
        removeErr();
        return true;
    } else {
        removeErr();
        let errMsg = "비밀번호는 ";
        if (pwd1_value.length < len) {
            errMsg += `${len}글자 이상, `;
            // errMsg = errMsg + `${len}글자 이상, `;
        }
        if (!num.test(pwd1_value)) {
            errMsg += "숫자를 포함, ";
        }
        if (!eng.test(pwd1_value)) {
            errMsg += "영문을 포함, ";
        }
        if (!spc.test(pwd1_value)) {
            errMsg += "특수문자를 포함, ";
        }
        errMsg += "동일하게 입력하세요";
        addErr(errMsg);
        return false;
    }
}








toggleBtn.addEventListener("click", () => {
    //클릭했을때 password type을 text로 변경해서 비밀번호가 보이도록
    if (pwd.type === "password") {
        pwd.setAttribute("type", "text");
        toggleBtn.classList.add("hide");
    } else if (pwd.type === "text") {
        pwd.setAttribute("type", "password");
        toggleBtn.classList.remove("hide");
    }
});