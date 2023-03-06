// declaration des variables
var enter = false;
var def = document.getElementsByClassName('definition');
var defBloc = document.getElementsByClassName('tabline');
var main = document.getElementById('main');
var succes = false;
var definition = [];
var dynamElem;
var modal = document.getElementsByClassName("modal")[0];
var img = document.getElementsByClassName('illu-lexique');
var modalImg = document.getElementsByClassName("modal-content")[0];
var captionText = document.getElementsByClassName("caption")[0];
var span = document.getElementsByClassName("close")[0];
var navBar = document.getElementById('navBar');
var arrowBloc = document.getElementById('arrowBloc');
activeCursor = false;

// evenements au clic et a la pression d'une touche sur tout le document
document.addEventListener('click',checkElement);
document.addEventListener('mousemove',whereIsCursor);
document.addEventListener('keypress',checkElement);
document.addEventListener('click', function(e)
{
    if(e.target && e.target.id == 'close')
    {
        modal.style.visibility = "hidden";
    }
});
document.addEventListener('scroll', stickyNavbar);

// fonction qui determine quelle zone a été cliquée ou a quelle etape la touche 'entree' a été pressée 
// avec redirection en consequence
function checkElement(e){
    if(enter == true)
    {
        enter = false;
    }

    if(e.target && e.target.id == "startResearch" && document.getElementById('searchBar').value != undefined && document.getElementById('searchBar').value != "" || e.key == 'Enter' && document.getElementById('searchBar').value != undefined && document.getElementById('searchBar').value != "")
    {
        research();
        // reset de la valeur de la barre de recherche
        document.getElementById('searchBar').value = "";
        enter = true;
    }
    if(e.target && e.target.id == "ok" || e.key == 'Enter' && enter == false)
    {
        resetDefs();
    }
}

// comparaison des données de recherche
function research(){
    // recuperation de la valeur de la barre de recherche et transformation en majuscules
    var searchBarValue = document.getElementById('searchBar').value.toUpperCase();
    // reset de la valeur de la barre de recherche
    document.getElementById('searchBar').value = "";
    // pour tous les elements de classe 'definition'
    for (i=0;i<def.length;i++)
    {
        // on ajoute l'element dans un tableau
        definition.push(document.getElementsByClassName('definition')[i].innerHTML.toUpperCase());
     
        // comparaison des valeurs avec startWith() qui renvoie un booleen
        var compare = definition[i].startsWith(searchBarValue);
        if(compare === true)
        {
            succes = true;
        }
        else
        {
           defBloc[i].style.display = 'none';
        }
        
    }
    if(succes === false)
    {
        // creation d'elements qui constituent une div d'information qui renvoient l'info qu'il n'y a aucun resultats avec un bouton valider
        dynamElem = document.createElement("div");
        dynamElem.id = 'boxValid';
        dynamElem.setAttribute("class","boxValid");
        main.appendChild(dynamElem);
        dynamInput = document.createElement('input');
        dynamElem.appendChild(dynamInput);
        dynamInput.setAttribute("id","ok");
        dynamInput.setAttribute("class","valid-def");
        dynamInput.setAttribute("type","button");
        dynamInput.setAttribute("value","ok");
        dynamP = document.createElement('p');
        dynamElem.appendChild(dynamP);
        dynamP.innerText = "Désolé, la recherche n'a retourné aucun resultat. Veuillez verifier que le mot clé est bien renseigné.";
        document.getElementById('boxSearch').style.visibility = "hidden";
    }
    else
    {
        // creation d'elements qui constituent une div d'information avec un bouton valider
        dynamElem = document.createElement("div");
        dynamElem.id = 'boxValid';
        dynamElem.setAttribute("class","boxValid");
        main.appendChild(dynamElem);
        dynamInput = document.createElement('input');
        dynamElem.appendChild(dynamInput);
        dynamInput.setAttribute("id","ok");
        dynamInput.setAttribute("class","valid-def");
        dynamInput.setAttribute("type","button");
        dynamInput.setAttribute("value","ok");
        document.getElementById('boxSearch').style.visibility = "hidden";
    }
  
};

// fonction de reset des definitions
function resetDefs(){
    dynamElem = document.getElementById('boxValid');
    dynamElem.remove();
    for (i=0;i<def.length;i++)
    { 
        defBloc[i].style.display = 'flex';
    }
    document.getElementById('boxSearch').style.visibility = "visible";
    succes = false;
};

// fonction permettant de consulter les images au clic
function picture_box(){
    modal.style.visibility = "visible";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
   
};

for(i=0;i<img.length;i++){
    img[i].addEventListener('click', picture_box);
};

function stickyNavbar()
{
    if(window.pageYOffset == 0)
    {
        navBar.style.transform = 'translateY(0px)';
        activeCursor = false;
        arrowBloc.classList.remove('arrow-moves');
    }
    else
    {
        if(window.pageYOffset > 200)
        {
            navBar.style.transform = 'translateY(-300px)';
            activeCursor = true;
            arrowBloc.classList.add('arrow-moves');
        }
        
    }
    return activeCursor;
};

function whereIsCursor(e){
    if(e.clientY < 300 && activeCursor === true)
    {
        navBar.style.transform = 'translateY(0px)';
        arrowBloc.classList.remove('arrow-moves');

    }
    else
    {
        if(e.clientY > 300 && activeCursor === true)
        navBar.style.transform = 'translateY(-300px)';
        arrowBloc.classList.add('arrow-moves');
    }
    
}

