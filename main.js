const maxCislo = 50;
const pocet = 5;

function isFilled()
{
    let ok = true;
    for (let i = 0; i<pocet; i++)
    {
        let id = "in"+i.toString();
        let zadanaHodnota = document.getElementById(id).value;

        if ((zadanaHodnota == "") || (isNaN(zadanaHodnota)) || (zadanaHodnota<1) || (zadanaHodnota>maxCislo))
        {
           ok = false;
           //alert("Blbec"); 
           break; 
        }
    }
    if (ok)
    {
        ok = duplicity()
    }
    return ok;
}

function duplicity()
{
    let field = [], ok = true;

    for (let i = 0; i<pocet; i++)
    {
        let idIn = "in"+i.toString();
        field.push(document.getElementById(idIn).value);
    }
    
    for (let i = 0; i<pocet; i++)
    {
        for (let j = 0; j<pocet; j++)
        {
            if (i!=j)
            {
                if(field[i] == field[j])
                {
                    ok = false;
                    i = j = pocet; 
                    //alert("Chyba"); 
                }
            }
        }
    }
    return ok;
}

function run()
{
    let ticket = [], tazenaCisla = [];

    if(isFilled())
    {
        document.getElementById("reset").disabled=false;
        document.getElementById("run").disabled=true;
        document.getElementById("autoInfill").disabled=true;


        for (let i = 0; i < pocet; i++)
        {
            let idIn = "in"+i.toString();
            document.getElementById(idIn).readOnly=true; 
            ticket.push(Number(document.getElementById(idIn).value));

            let idOut = "out" + i.toString();
            tazenaCisla.push(gen(1,maxCislo,tazenaCisla));
            document.getElementById(idOut).value = tazenaCisla[i];
        }
        check(ticket, tazenaCisla);
    }
    else 
    {
        alert("Mistake happened, good luck next try.");
    }
}

function gen(min, max, pole)
{
    let cislo;

    do 
    {
        cislo = random(min,max);    
    } 
    while (pole.includes(cislo));
    return cislo;
}

function random(min, max)
{
    return Math.floor(Math.random()*(max-min+1) +min);
}

function autoInfill()
{
    let field = [];
    for(let i=0; i<pocet; i++)
    {
        let idIn = "in" +i; 
        field.push(gen(1, maxCislo, field));
        document.getElementById(idIn).value=field[i];
    }
}

function check(ticket, tazenaCisla)
{
    let uhodnuto; 
    for (let i = 0; i < pocet; i++)
    {
        uhodnuto = false; 
        for (let j = 0; j < pocet; j++)
        {
            if (ticket [i] == tazenaCisla[j])
            {
                uhodnuto = true; 
                break;
            }
        }
        let idIn="in"+i;
        document.getElementById(idIn).className = uhodnuto ? "win":"lose" //className kvuli css, : rozdeluje na dve podminky (pravo win, levo lose) 
    }
}

function reset()
{
    document.getElementById("reset").disabled=true;
    document.getElementById("run").disabled=false;
    document.getElementById("autoInfill").disabled=false;

    for(let i = 0; i<pocet; i++)
    {
        let idIn = "in" +i;
        let idOut = "out" +i;

        const inputElement = document.getElementById(idIn);
        inputElement.className = "none"
        inputElement.value = null;
        inputElement.readOnly = false;

        const outputElement = document.getElementById(idOut);
        outputElement.className = "none"
        outputElement.value = null; 

    }
}

function addListener()
{
    for(let i = 0; i<pocet; i++)
    {
        let input = document.getElementById("out"+i);
        input.addEventListener("dblclick", ()=>cheat(i))
    }
}

function cheat(i)
{
    let hodnota = document.getElementById("out" +i).value;
    document.getElementById("in" +i).value = hodnota; 

    if(hodnota!="")
    {
        document.getElementById("in" +i).className="win";
    }
}