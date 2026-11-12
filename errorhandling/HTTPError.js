// dette er skabelon. i javascript er en class en skabelon til at skabe objekter. hvis jeg vil oprette mange ens ting behøver jeg ikke skrive det hele hver gang
// når controller thrower en error bruger den denne skabelon til at pakke fejlen pænt ind så den får både en message og en statuscode
// javascript har en indbygget Error klasse og den vil vi gerne bruge fordi så opfører klassen sig som en rigtig error, men når vi bruger extend betyder det jeg gerne vil bygge videre på den
class HTTPError extends Error {
  // jeg definerer en klasse der hedder HTTPError
  constructor(statusCode, message) {
    //constructor er en startfunktion der kører så snart jeg skriver new HTTPError(...) og den tager imod de 2 ting jeg sender med ind: statuskoden fx 404 og beskeden fx "Teacher not found"
    //når der i controlleren står throw new HTTPError(404, "Teacher not found"); putter vi værdierne for parametrene ind, så statusCode er 404 i denne instans og message er "Teacher not found"

    super(message); // super refererer til parent class'en (ogs kaldet superklassen)
    // når min HTTPError extender javascrips indbygggede Error class, så er Error parent og HTTPError er child
    // i javascript er der en regel: hvis man laver en klasse der arver fra en anden klasse skal man kalde super() inde i constructor før man skriver this
    // når man skriver super() sender man beskeden fx "Teacher not found" videre op til javascripts oprindelige Error klasse
    //  Error-klasse skal bruge den besked for at kunne oprette selve fejlen korrekt, så den fx. ved, hvordan den skal oprette en stack trace (så jeg kan se hvilken linje i koden der gik galt)
    this.statusCode = statusCode; // her bestemmer jeg at det skal hedde statusCode. Her gemmer jeg tallet fx 404 som en property (.statusCode) direkte på det aktuelle fejl-objekt der er ved at blive oprettet. det er denne property som error-middleware senere læser (err.statusCode)
    // dybere forklaring of forskellen på de 2 statusCode ord, det er det samme ord på hver side af =, men de betyder forskelligeting
    // this.statusCode: det er navnet på den property jeg opretter på det nye objekt som er ved at blive bygget. det er mig der har valgt navnet nu her
    // = statusCode: det er den værdi der sendes ind udefra som et parameter, her referer jeg til parametren i constructor linjen. det er constructoren der modtager værdien. værdien kommer fra controller hvor jeg fx skriver throw new HTTPError (404, "teacher not found"), så statusCode er i dette eksmepel 404

    // this betyder at det er det objekt der arbejdes på lige nu altså når jeg i controlleren skriver new HTTPError så laver den en ny instans baseret på denne skabelon og det er DENNE fejl der sættes en statusCode på.
    // fx this.statusCode = statusCode; sørger for, at tallet 404 bliver gemt i en egenskab (.statusCode) på det her specifikke fejl-objekt.
    // Hvis jeg senere kaster en anden fejl (f.eks. en 500-fejl et andet sted), bliver this opdateret til at pege på den nye fejl så de to fejl ikke blandes sammen
    this.message = message;
  }
}

export default HTTPError;
