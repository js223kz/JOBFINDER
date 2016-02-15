# Projektbeskrivning
Jag vill göra en applikation som samlar relevant information för den som söker jobb inom data/it.
Informationen ska filteras utifrån användarens nuvarande position. I ett första skede ska applikationen
visa data/it jobb från Platsbanken, men tanken är att jag ska kunna bygga på den med intressanta meet-ups,
exjobb, branschstatistik och jobb från andra källor än Platsbanken.

Det finns en hel del sidor som riktar in sig på data/it-branschen, Dfind IT är en av dem, men de flesta
är rena rekryteringssidor. Jag vill göra en applikation som har lite av varje som är intressant för mig
som är i slutet av min utbildning och i början av en karriär. Dessutom är jag i de allra flesta fall bara intresserad av
det som sker i den region jag bor och skulle uppskatta en sida som i första hand bara visar resultat från mitt närområde.

[Länk till applikationen](http://46.101.166.136)<br>
[Länk till filmen](https://www.screenmailer.com/v/6eKFrpgXabSRsxw)

### Kravspecifikation
Applikationen ska hämta användarens position<br>
Utifrån användarens position hämta län<br>
Koppla länet till ett id<br>
Baserat på länets id hämta lediga jobb inom data/it<br>
Rendera ut en lista över lediga jobb<br>
Hämta detaljer om ett specifikt jobb utifrån ett jobb-id<br>
Rendera ut information om ett specifikt jobb<br>
Användaren ska kunna uppdatera sin position<br>
Statiska filers ska cachas<br>
Användaren ska bli medveten om applikationen går offline<br>

#### Sekundära krav
Användaren ska kunna söka information från orter andra än enhetens nuvarande position.

### Api:er
Arbetsförmedlingens API, Google Maps API

### Applikationens flöde
[Flödesschema](https://drive.google.com/file/d/0Bwo7ZJERQOUMQzJsSi1fRjB1cDA/view?usp=sharing)

### Prestanda
Mina teorier baseras på Steve Souders, High Performance Web Sites: Essential Knowledge for Frontend Engineers

Minskat antalet Http-anrop:<br>
Applikationen innehåller inga onödiga filer som inte används.
Alla js- css- json- och bild-filer chachas som default i en månad.

Enligt undersökningar står HTML-dokumentet endast av 10-20% av laddningstiden för slutanvändaren. Alla andra
komponenter som t ex bilder, css- och skriptfiler, som det refereras till i HTML-dokumentet står för resterande 80-90%.

Minska laddningstider på Http-anrop:<br>
Alla js- css- html- och php-filer komprimeras vid uppladdning.

Svarstiden från servern är kortare ju mindre storleken är på svaret. Att komprimera HTTP-svaren är ett
kraftfullt sätt att minska laddningstiderna. Som tumregel bör man inte komprimera filer som är mindre än 1-2k då det
tar kraft att både komprimera och dekomprimera filer. Jag har gjort det trots att vissa filer är mindre, men jag ville
prova på att göra det ändå.

Referenser till CSS-filer ligger i Head-taggen.

När css-filer placeras i slutet av Html-dokumentet blockerar browsern rendering av alla element tills dess att css-filen
är laddad. Detta för att slippa rendera om element ifall css-koden kommer att förändra något av dessa element.
Det är inte det att laddningstiden faktiskt är kortare om man placerar css-filen högst upp, tvärtom,
men eftersom inget renderar ut förrän css-filen har laddats upplevs laddningstiden som längre och ger en sämre
användarupplevelse.

Javascript- och CSS-filer är separerade från HTML-filerna.<br>
Ger initialt inte kortare laddningstid då det är fler filer som ska laddas upp. Det ger dock möjligheten att cacha
CSS- och javascriptfiler.

De flesta tredjehandsbibliotek laddas in via CDN.

Content Delivery Network är gjort för att ladda externa komponenter snabbt och de flesta browsers chachar dess innehåll
automatiskt.


### Säkerhet
Kanske inte världens mest hemliga information, men min epostadress som krävs vid användande av Platsbankens API hanteras
på servern och ligger i en Settingsfil som inte laddas upp på Github.
Data valideras före den skickas vidare till server eller andra API:er för att undvika XSS-attacker.

Applikationen hanterar inte inloggningen eller känslig data, säkerhet har därför inte legat i fokus.

### Offline first
Användaren informeras om nätet går ner. Dock upplever jag att den informationen visas alltför ofta när sidan initialt
laddas. Jag behöver troligtvis sätta en timeout på meddelandet alternativt titta på andra lösningar än navigator.online.
Har användaren besökt sidan förr är förstasidan chachad och visas således nät eller inte.

### Risker med applikationen:
Först och främst är den helt beroende av att andra API:er fungerar för att vara meningsfull för användaren.
Den är också individuell för användaren då dennes egen position används för att filtrera data. Det är därför inte
meningsfullt att visa någon slags "defaultdata". Jag tänker att det är viktigt att jag får in mer data
från andra källor i applikationen så användaren känner att besöket ger något trots att något API ligger nere.

Jag har säkerställt att de API:er jag använder inte belastas för ofta genom att cacha data från Platsbanken i tre timmar
och per session. Positionsdata hämtas initialt sedan får användaren själv initiera en uppdatering.


### Egen reflektion kring projektet:
Det är fantastiskt att det finns öppna API:er att använda, men hur min hjärna löser saker är inte alltid på
samma sätt som API:et är uppbyggt. Jag stötte på patrull när jag behövde koppla en användares position till ett länid,
men det löste sig och i framtiden får jag lägga mer tid på research innan jag kodar. Det kliar i fingrarna att börja
programmeringen, men det finns en anledning till att ni lärare poängterar vikten av förberedelser.

Som vanligt ville jag prova något nytt och denna gång använde jag Angular på klienten och Php på servern.
Det tog lite tid att komma underfund med hur jag skulle göra det, men det är jag nöjd med att ha fått ihop.

Jag fastnade också på cachningen där jag helst hade velat prova på service workers, men det fick bli en lösning med
.htaccess.

Självklart skulle jag också velat implementera fler API:er, men det är bara att fortsätta bygga på applikationen.




