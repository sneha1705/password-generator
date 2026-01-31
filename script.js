function generatePassword(){
    let length = +document.getElementById("length").value;
    let upper = document.getElementById("upper").checked;
    let lower = document.getElementById("lower").checked;
    let num = document.getElementById("num").checked;
    let sym = document.getElementById("sym").checked;
    let norepeat = document.getElementById("norepeat").checked;
    let exclude = document.getElementById("exclude").checked;

    let U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let L = "abcdefghijklmnopqrstuvwxyz";
    let N = "0123456789";
    let S = "!@#$%^&*()_+{}[]<>?/";

    if(exclude){
        U = U.replace(/[O]/g,'');
        L = L.replace(/[l]/g,'');
        N = N.replace(/[01]/g,'');
    }

    let all="", required=[];
    if(upper){all+=U; required.push(U);}
    if(lower){all+=L; required.push(L);}
    if(num){all+=N; required.push(N);}
    if(sym){all+=S; required.push(S);}
    if(!all) return alert("Select at least one option");

    let pass=[];

    // ensure at least one from each selected set
    required.forEach(set=>{
        pass.push(set[Math.floor(Math.random()*set.length)]);
    });

    while(pass.length < length){
        let ch = all[Math.floor(Math.random()*all.length)];
        if(norepeat && pass.includes(ch)) continue;
        pass.push(ch);
    }

    // shuffle
    pass = pass.sort(()=>Math.random()-0.5);
    let finalPass = pass.join('').slice(0,length);

    document.getElementById("password").value = finalPass;
    checkStrength(finalPass);
}

function copyPassword(){
    let pass = document.getElementById("password").value;
    navigator.clipboard.writeText(pass);
    alert("Copied!");
}

function toggleShow(){
    let field = document.getElementById("password");
    field.type = field.type === "password" ? "text" : "password";
}

function toggleMode(){
    document.body.classList.toggle("dark");
    document.getElementById("box").classList.toggle("dark");
}

function checkStrength(pass){
    let strength = 0;
    if(pass.length > 8) strength++;
    if(/[A-Z]/.test(pass)) strength++;
    if(/[0-9]/.test(pass)) strength++;
    if(/[!@#$%^&*]/.test(pass)) strength++;

    let text = document.getElementById("strengthText");

     if(strength <= 1){
        text.innerText = "Weak Password ❌";
        text.style.color = "red";
    }
    else if(strength == 2){
        text.innerText = "Medium Password ⚠️";
        text.style.color = "orange";
    }
    else{
        text.innerText = "Strong Password ✅";
        text.style.color = "green";
    }
}