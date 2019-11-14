//Side note:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

//Kada se učita naš document hoćemo da se naredna funkcija izvrši
$(document).ready(function () {

    //Kreiramo funkciju za generisanje karaktera
    var createChar = function(charData){
        //Funkcija prihavata charData koji ćemo prikupiti sa interneta preko APIa
        // ono što nam je bitno jeste struktura svih objekata u tom API-u, koja izgleda ovako:
        // {
        //     "id": 2,
        //     "name": "Morty Smith",
        //     "status": "Alive",
        //     "species": "Human",
        //     "type": "",
        //     "gender": "Male",
        //     "origin": {
        //       "name": "Earth",
        //       "url": "https://rickandmortyapi.com/api/location/1"
        //     },
        //     "location": {
        //       "name": "Earth",
        //       "url": "https://rickandmortyapi.com/api/location/20"
        //     },
        //     "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        //     "episode": [
        //       "https://rickandmortyapi.com/api/episode/1",
        //       "https://rickandmortyapi.com/api/episode/2",
        //       // ...
        //     ],
        //     "url": "https://rickandmortyapi.com/api/character/2",
        //     "created": "2017-11-04T18:50:21.651Z"
        //   }
        //kako je u pitanju JSON objekat, možemo na lak način da pristupimo svim elementima tog objekta

        //Prvo ćemo pokupiti naš templejt iz index.html-a i pretvoriti ga u string
        var charel = $('#template-element').prop('outerHTML');
    
        var newHtml,hoverClr;

        //koriščenjem map funkcije na svaki objekat u charData primenićemo funkciju, kojoj prosleđujemo element el do kog je map stigao, kako i njegov index i
        $.map(charData, function (el, i) {

            //kreiramo novi HTML string u kojem ćemo zameniti placeholder elemente sa pravim vrednostima
            //1. Brišemo id="template-element" jer sada kreiramo elemente sa njihovim id-evima
            newHtml = charel.replace('id="template-element"','');
            //2. Menjamo placeholder za sliku sa slikom iz objekta
            newHtml = newHtml.replace("%char-img-scr%", el.image);
            //3. Menjamo id targeta za modal
            newHtml = newHtml.replace("%char-modal-id%", i);
            //4. dodajemo taj element na kraj diva id ="characters"
            $("#characters").append(newHtml);
            
        });

        //Posto smo dodali sve elemente, templejt brišemo
        $('#template-element').remove();

        //Hoćemo za svaki element da kreiramo random boju koja će se se primeniti prilikom hover-a
        for (el of $(".portfolio .portfolio-item .portfolio-item-caption") ){
            hoverClr = "rgba("+Math.floor(Math.random() * 256)+","+Math.floor(Math.random() * 256)+","+Math.floor(Math.random() * 256)+",0.9)";
            el.style.backgroundColor=hoverClr;
        }
    }

    //Kreiramo funkciju za generisanje modala
    //Na isti način kao i kod karaktera
    var createModal = function(charData){
        //Funkcija prihavata charData koji ćemo prikupiti sa interneta preko APIa

        //Prvo ćemo pokupiti naš templejt iz index.html-a i pretvoriti ga u string
        var charModal = $('.modal-template').prop('outerHTML');
        let fa = ["fas fa-brain",
            "fas fa-dna",
            "fas fa-globe",
            "fas fa-atom",
            "fas fa-biohazard",
            "fas fa-meteor",
            "fas fa-moon",
            "fas fa-radiation",
            "fas fa-rocket",
            "fas fa-satellite-dish",
            "fas fa-user-astronaut"]
        var newHtml;
        $('.modal-template').remove();
        //koriščenjem map funkcije na svaki objekat u charData primenićemo funkciju, kojoj prosleđujemo element el do kog je map stigao, kako i njegov index i
        $.map(charData, function (el, i) {

            //kreiramo novi HTML string u kojem ćemo zameniti placeholder elemente sa pravim vrednostima
            newHtml = charModal.replace("%name%", el.name);
            newHtml = newHtml.replace("%gender%", el.gender);
            newHtml = newHtml.replace("%origin-name%", el.origin.name);
            newHtml = newHtml.replace("%status%", el.status);
            newHtml = newHtml.replace("%date-creation%", el.created);
            newHtml = newHtml.replace("%char-img-scr%", el.image);
            newHtml = newHtml.replace("%char-modal-id%", i);
            newHtml = newHtml.replace("%fa-icon%", fa[Math.floor(Math.random()*fa.length)]);

            //dodajemo taj element na kraj diva id ="characters"
            $("#modals").append(newHtml);
        });
        
        //Posto smo dodali sve elemente, templejt brišemo
        
    }
    
    //get funkcija nam daje mogućnost da dođemo do podataka
    //Ti podaci mogu biti lokalno sačuvani u nekom fajlu, i u tom slučaju bi se prosleđivala njegova referenta putanja
    //ili mogu biti oline dostupni podaci, kako što je to u našem slučaju
    //podatke prikupljamo sa sledećeg sajta: https://rickandmortyapi.com/documentation
    //u okviru dokumentacije možemo da vidimo na koji se način kojim podacima pristupa
    //mi želimo sve karaktere od 1 do 18 https://rickandmortyapi.com/documentation#get-multiple-characters
    $.getJSON("https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]", function (data) {
        //getJSON funkcija uzima podatke i pakuje ih u  -data- parametar koji prosleđujemo funkciji, koja će ih obraditi
        
        //pozivamo obe metoda se se izvrše i prosleđujemo im data kao parametar
        createChar(data);    
        createModal(data);

        //na samom kraju kreiraćemo paginaciju korišćenjem slick JQuery plugin-a, koji nam dozvoljava da elemente prikažemo po stranama, odnosno u slider-u https://kenwheeler.github.io/slick/
        //u index.html stranici ćemo samo referencirati ovaj plug-in kada ga dowload-ujemo
        $('#characters').slick({
            dots: true, //prikazuje nam tačkice ispod slider-a kako bismo znali na kojoj smo strani
            infinite: true, //daj enam mogućnost da beskonačno skrolujemo kroz slajder, tj kada dođemo do kraja klikom na dalje samo nas vraća na početak
            slidesToShow: 3, //prikazujemo 3 karaktera
            slidesToScroll: 3 //i klikom na dalje preskačemo 3 
          });
    });

});

