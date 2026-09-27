// ════════════════════════════════════════════════════════════════════════════
//   NZDO CONCERT LIST  –  edit the text between the two ✂ lines.
//   Leave these top lines and the very last line of the file alone.
// ════════════════════════════════════════════════════════════════════════════
NZDO.concerts(String.raw`# ✂ ────────────── edit below this line ──────────────

# HOW TO ADD A CONCERT
#
#  1. Copy one whole concert block (from "[[concert]]" down to the blank
#     line before the next one), paste it at the top of the list below,
#     and change the details.
#  2. Put the photos in a new folder:   concert_photos/2027_concert/
#     (any file names – they are shown in name order; the first photo is
#     also used on the "Previous concerts" page unless you set  image = ...)
#  3. Put the programme / poster PDFs in the  files/  folder.
#  4. Double-click previous-concerts.html to check it looks right.
#
# RULES
#  • Text goes inside "double quotes".  Numbers and dates don't.
#  • Lists go inside [ square brackets ], one item per line, each ending
#    with a comma.
#  • Links:   [text to show](https://address)      Italics:   *like this*
#  • Lines starting with # are notes and are ignored.
#  • Don't use the backtick character (the key left of 1) anywhere.
#
# If you make a typo, the website will show a message saying which line
# to look at.  Only year, date, venue and works are required; every other
# line can be left out.
#
# FIELDS
#  year, date (YYYY-MM-DD), venue, venue_url, city, conductor, conductor_url,
#  players, note, works, image, banner, programme, poster, donation,
#  recipient, recipient_url, sponsors, links, youtube, quote

# Reused sponsorship wording, referenced below as  sponsors = "standard"
[sponsor_text]
standard = "We are grateful for sponsorship for student travel from the [University of Otago](https://www.otago.ac.nz/) division of humanities performing arts fund, and division of health sciences; and from the [University of Auckland](https://www.fmhs.auckland.ac.nz/en.html). [MAS](https://www.mas.co.nz/) provided sponsorship for dinner for the students."
social = "We are grateful for sponsorship for student travel from the [University of Otago](https://www.otago.ac.nz/) division of humanities performing arts fund, and division of health sciences; and from the [University of Auckland](https://www.fmhs.auckland.ac.nz/en.html). [MAS](https://www.mas.co.nz/) provided sponsorship for some of our social functions."


[[concert]]
year = 2026
date = 2026-09-20
venue = "Theatre Royal, TSB Showplace"
venue_url = "https://npeventvenues.nz/venues/tsb-showplace/theatre-royal"
city = "New Plymouth"
conductor = "José Aparicio"
conductor_url = "https://www.napierchoir.org.nz/about"
players = 82
note = "It was a sold-out performance."
works = [
  "Wagner: *Tristan und Isolde* – Prelude and Liebestod",
  "Beethoven: *Piano Concerto No. 5 (Emperor)*, soloist [Dr Ben Booker](https://www.rnz.co.nz/concert/programmes/three-to-seven/audio/2019051849/booker-plays-beethoven)",
  "Strauss: *Tod und Verklärung*",
]
image = "img/cards/2026.jpeg"
banner = "img/banners/2026.jpeg"
programme = "files/nzdo_2026_programme.pdf"
poster = "files/nzdo_2026_poster.pdf"
donation = 9091.60
recipient = "Hospice Taranaki"
recipient_url = "https://hospicetaranaki.org.nz/"
sponsors = "social"
links = [
  { text = "RNZ Concert interview with Ben Booker", url = "https://www.rnz.co.nz/concert/programmes/three-to-seven/audio/2019051849/booker-plays-beethoven" },
  { text = "RNZ Morning Report interview with Tim Wilkinson", url = "https://www.rnz.co.nz/national/programmes/morningreport/audio/2019052413/nz-doctor-s-orchestra-concert-taking-place-in-new-plymouth" },
  { text = "Feature in The Post", url = "https://www.thepost.co.nz/nz-news/361082981/doctors-orchestra-hits-high-notes-hospice" },
]


[[concert]]
year = 2025
date = 2025-07-20
venue = "Nelson Centre of Musical Arts"
venue_url = "https://ncma.nz/"
city = "Nelson"
conductor = "Mark Hodgkinson"
players = 71
note = "It was a sold-out performance."
works = [
  "John Rimmer: *Cloud Fanfares*",
  "Stravinsky: *Firebird* suite",
  "Tchaikovsky: *Violin concerto*, soloist [Dr Rachel Moxham](https://www.opusorchestra.co.nz/meet-the-orchestra)",
]
image = "img/cards/2025.jpeg"
banner = "img/banners/2025.jpg"
programme = "files/nzdo_2025_programme.pdf"
donation = 6883.25
recipient = "Nelson Tasman Hospice"
recipient_url = "https://www.nelsonhospice.org.nz/"
sponsors = "social"
links = [
  { text = "Video: Stravinsky", url = "https://www.dropbox.com/scl/fi/n443sabfd21mgu46c88le/Stravinsky.MP4?rlkey=2ylsxyslwe89e5cgiugymhbgr&dl=0" },
  { text = "Video: Rachel in concert", url = "https://www.dropbox.com/scl/fi/puov5go7m9t7sfjuuoxc8/Rachel-in-concert.mp4?rlkey=mlxxd35bmk9pl866z7sz9iorp&dl=0" },
]


[[concert]]
year = 2024
date = 2024-06-16
venue = "Nelson Centre of Musical Arts"
venue_url = "https://ncma.nz/"
city = "Nelson"
conductor = "José Aparicio"
conductor_url = "https://www.napierchoir.org.nz/about"
players = 67
works = [
  "Tchaikovsky: *Romeo and Juliet* Overture",
  "Brahms: *Concerto for violin and cello*, soloists Dr Osman Ozturk and [Dr Catherine Kwak](https://www.auckland.ac.nz/en/news/2021/07/07/musical-medicine-student-claims-top-prize-for-cello-performance.html)",
  "Prokofiev: *Romeo & Juliet* Suite 2",
]
image = "img/cards/2024.jpg"
banner = "img/banners/2024.jpg"
programme = "files/programme_notes.pdf"
poster = "files/nzdo_2024_poster.pdf"
donation = 6807.50
recipient = "Nelson Tasman Hospice"
recipient_url = "https://www.nelsonhospice.org.nz/"
sponsors = "social"
links = [
  { text = "Video: Prokofiev, first movement", url = "https://www.dropbox.com/scl/fi/qabvwua9fme3n002nlxen/Prokofiev-first-movement.mov?rlkey=718hkmeeg6ybq3chr8o0rgzjp&dl=0" },
  { text = "Video: Prokofiev, second movement", url = "https://www.dropbox.com/scl/fi/h0lyb97zm83ejge1uw1ju/Prokofiev-mvt-2.mp4?rlkey=v6xoz888z6oz2s6sujsumey7p&dl=0" },
  { text = "Video: Prokofiev, fourth movement", url = "https://www.dropbox.com/scl/fi/en464xsl2qo2pebnxfmgr/Prokofiev-movt-4.mp4?rlkey=4rx0dus4emtvkethde1qlie81&dl=0" },
  { text = "Video: Prokofiev, start of fifth movement", url = "https://www.dropbox.com/scl/fi/4c70pmkwkjys1rxfjiyqv/Prokofiev-start-of-movement-5.mp4?rlkey=dio06oelvhe1w2yrt81b4h1ba&dl=0" },
  { text = "Video: Prokofiev, last movement", url = "https://www.dropbox.com/scl/fi/bbvv9y6x0emitwb6shd9d/Prokofiev-last-movement.mp4?rlkey=cxgfx3mkxdrixg0y77s83wij3&dl=0" },
]


[[concert]]
year = 2023
date = 2023-07-23
venue = "Theatre Royal, TSB Showplace"
venue_url = "https://npeventvenues.nz/venues/tsb-showplace/theatre-royal"
city = "New Plymouth"
conductor = "Mark Hodgkinson"
players = 76
works = [
  "Anthony Ritchie: *Procession*",
  "Canteloube: *Baïlèro* from Songs of the Auvergne, soloist Dr Frances Campbell",
  "Shostakovich: *Symphony No. 5*",
]
image = "img/cards/2023.jpeg"
banner = "img/banners/2023.jpeg"
programme = "files/nzdo_2023_programme.pdf"
poster = "files/nzdo_concertposter_2023.pdf"
donation = 7054.10
recipient = "Hospice Taranaki"
recipient_url = "https://www.hospicetaranaki.org.nz/"
sponsors = "We are grateful to [MAS](https://www.mas.co.nz/), who were our major sponsor. The [University of Otago](https://www.otago.ac.nz/) division of humanities performing arts fund, and division of health sciences; and the [University of Auckland](https://www.fmhs.auckland.ac.nz/en.html) provided sponsorship for student travel."
links = [
  { text = "Interview with Tom Wilkinson on RNZ Concert", url = "https://www.rnz.co.nz/concert/programmes/three-to-seven/audio/2018897244/musical-medicine" },
  { text = "Article in the Stratford Press featuring three players with local connections", url = "https://www.nzherald.co.nz/stratford-press/news/the-new-zealand-doctors-orchestra-preparing-to-perform-in-new-plymouth/EAIRVQNSNRBC3P57W7GXTE2D6U/" },
  { text = "Article in the Opunake & Coastal News", url = "files/opunake___coastal_news.pdf" },
  { text = "Article in Otago University news", url = "https://www.otago.ac.nz/otagobulletin/undergraduate/news/otago0246868.html" },
]
quote = { by = "Rose, Hospice Taranaki", text = "This well-earned donation is going to make a significant difference in supporting the comfort, care and support that we provide people in our community with. Well done – it is such a great compliment to us, to have doctors from around the country gather together to raise money for the services we provide – really humbling. Please let everyone know that we are really extremely grateful." }


[[concert]]
year = 2022
date = 2022-07-24
venue = "Nelson Centre of Musical Arts"
venue_url = "https://ncma.nz/"
city = "Nelson"
conductor = "Mark Hodgkinson"
players = 58
works = [
  "Mozart: *Piano Concerto No. 24 in C minor K491*, soloist [Dr Louise Webster](https://sounz.org.nz/contributors/1813)",
  "Beethoven: *Symphony No. 3*",
]
image = "img/cards/2022.jpg"
banner = "img/banners/2022.jpg"
programme = "files/nzdo_2022_programme.pdf"
poster = "files/nzdo_concert_poster.pdf"
donation = 3495
recipient = "Nelson Tasman Hospice"
recipient_url = "https://www.nelsonhospice.org.nz/"
sponsors = "standard"


[[concert]]
year = 2021
date = 2021-06-27
venue = "Nelson Centre of Musical Arts"
venue_url = "https://ncma.nz/"
city = "Nelson"
conductor = "Mark Hodgkinson"
players = 59
note = "An additional 9 players from Wellington could not join us due to the Covid-19 lockdown over that weekend – we missed our Wellington friends."
works = [
  "Lilburn: *Drysdale* overture",
  "Dvořák: *Cello concerto*, soloist [Dr Catherine Kwak](https://www.auckland.ac.nz/en/news/2021/07/07/musical-medicine-student-claims-top-prize-for-cello-performance.html)",
  "Vaughan Williams: *Symphony No. 5*",
]
image = "img/cards/2021.jpg"
banner = "img/banners/2021.jpg"
programme = "files/nzdo_2021_programme.pdf"
poster = "files/nzdo_concert_poster_2021.pdf"
donation = 5946.50
recipient = "Nelson Tasman Hospice"
recipient_url = "https://www.nelsonhospice.org.nz/"
sponsors = "standard"


[[concert]]
year = 2019
date = 2019-06-23
venue = "Dunedin Town Hall"
venue_url = "https://dunedinvenues.co.nz/venues/dunedin-town-hall"
city = "Dunedin"
conductor = "Peter Adams"
conductor_url = "https://www.otago.ac.nz/mtpa/staff/otago624986.html"
players = 69
works = [
  "Anthony Ritchie: *Hippocratic Hymn* – a commissioned overture",
  "Brahms: *Academic Festival* overture",
  "Séjourné: *Marimba concerto*, soloist Rachel Thomas (Auckland medical student)",
  "Dvořák: *Symphony No. 9*",
]
image = "img/cards/2019.jpg"
banner = "img/banners/2019.jpg"
programme = "files/nzdo_2019_programme.pdf"
poster = "files/poster2019.pdf"
donation = 6363
recipient = "Otago Community Hospice"
recipient_url = "https://otagohospice.co.nz/"
sponsors = "standard"
links = [
  { text = "Article in the Otago Daily Times", url = "https://www.odt.co.nz/news/dunedin/doctors-orchestra-play-tomorrow" },
  { text = "Otago Daily Times article (PDF)", url = "files/odt.pdf" },
  { text = "Article in the Dunedin Star", url = "https://www.thestar.co.nz/arts/dunedin-debut-for-orchestra/" },
  { text = "Dunedin Star article (PDF)", url = "files/star.pdf" },
]


[[concert]]
year = 2018
date = 2018-06-24
venue = "Municipal Theatre"
city = "Napier"
conductor = "José Aparicio"
conductor_url = "https://www.napierchoir.org.nz/about"
players = 78
works = [
  "Turina: *Danzas Fantásticas*",
  "Schumann: *Cello concerto*, soloist [Paul van Houtte](https://www.iheart.com/podcast/269-openarted-73834327/episode/what-is-more-important-than-any-75977160/) (Auckland medical student)",
  "Mussorgsky: *Pictures at an Exhibition*",
]
image = "img/cards/2018.jpg"
banner = "img/banners/2018.jpg"
programme = "files/2018_nzdo_concert_programme.pdf"
poster = "files/nzdo_concert_poster_2018.pdf"
donation = 5612.65
recipient = "Cranford Hospice"
recipient_url = "https://cranfordhospice.org.nz/"
sponsors = "standard"
links = [
  { text = "Feature in NZ Doctor", url = "files/nz_doctor_2018_feature.pdf" },
]


[[concert]]
year = 2017
date = 2017-06-11
venue = "The Piano"
city = "Christchurch"
conductor = "Mark Hodgkinson"
players = 48
works = [
  "Rossini: Overture to *The Italian Girl in Algiers*",
  "Mozart: *Concerto for flute and harp*, soloists Dr Duncan Watts (Dunedin anaesthetist) and Dr Vanessa Souter (Wellington GP)",
  "Beethoven: *Symphony No. 8*",
  "Dvořák: *Czech Suite* (final movement)",
]
image = "img/cards/2017.jpg"
banner = "img/banners/2017.jpg"
programme = "files/nzdo_concert_programme_2017.pdf"
poster = "files/nzdo_concert_poster_2017.pdf"
donation = 6894.90
recipient = "Nurse Maude Hospice"
recipient_url = "https://www.nursemaude.org.nz/hospice-palliative-care-service"
sponsors = "standard"
links = [
  { text = "Letter to the editor of The Press from John Emeleus, a well-respected musician, composer and teacher", url = "files/letter_to_editor.pdf" },
]


[[concert]]
year = 2016
date = 2016-06-26
venue = "Municipal Theatre"
city = "Napier"
conductor = "José Aparicio"
conductor_url = "https://www.napierchoir.org.nz/about"
players = 88
works = [
  "Beethoven: *Violin concerto*, soloist Dr Kiarash Taghavi (paediatric surgical registrar)",
  "Mahler: *Symphony No. 1*",
]
image = "img/cards/2016.jpg"
banner = "img/banners/2016.jpg"
programme = "files/nzdo_concert_programme_2016.pdf"
poster = "files/nzdo_poster_2016_a4.pdf"
donation = 8383.80
recipient = "Cranford Hospice"
recipient_url = "https://cranfordhospice.org.nz/"
sponsors = "standard"
links = [
  { text = "Article in On MAS, Autumn 2016", url = "files/on_mas_autumn_2016.pdf" },
  { text = "Radio advertisement (audio)", url = "files/radio-ad.mp3" },
]


[[concert]]
year = 2015
date = 2015-06-28
venue = "Theatre Royal, TSB Showplace"
venue_url = "https://npeventvenues.nz/venues/tsb-showplace/theatre-royal"
city = "New Plymouth"
conductor = "Mark Hodgkinson"
players = 79
works = [
  "Lilburn: *Festival* overture",
  "Beethoven: *Triple concerto*, soloists [Trio Pohádka](http://www.triopohadka.com/) (Dr Shyam Sankaran, Auckland radiology registrar; Lisa Chung & Petr Tomek)",
  "Sibelius: *Symphony No. 2*",
]
image = "img/cards/2015.jpg"
banner = "img/banners/2015.jpg"
programme = "files/programme_2015.pdf"
poster = "files/nzdo_poster.pdf"
donation = 7488.25
recipient = "Hospice Taranaki"
recipient_url = "https://www.hospicetaranaki.org.nz/"
sponsors = "standard"
links = [
  { text = "Interview with Shyam Sankaran and Tim Wilkinson on Concert FM Upbeat (audio)", url = "files/upbt-20150624-1440-tim_wilkinson_and_shyam_sankaran_nz_doctors-064.mp3" },
  { text = "Taranaki Daily News: father-and-son combo in doctors' orchestra", url = "https://www.stuff.co.nz/taranaki-daily-news/news/69421848/father-son-combo-in-doctors-orchestra" },
  { text = "Clipping: Raimond & Dominic Jacquemard", url = "img/taranaki_daily_news_17.6.15.jpg" },
  { text = "Taranaki Daily News: playing music good stress relief for doctors", url = "https://www.stuff.co.nz/taranaki-daily-news/news/69728319/playing-music-good-stress-relief-for-doctors" },
  { text = "Clipping: Louise Webster", url = "files/louise.pdf" },
  { text = "Review in the Taranaki Daily News", url = "https://www.stuff.co.nz/taranaki-daily-news/lifestyle/69859788/doctors-trade-scalpels-for-musical-instruments" },
]


[[concert]]
year = 2014
date = 2014-06-29
venue = "Theatre Royal, TSB Showplace"
venue_url = "https://npeventvenues.nz/venues/tsb-showplace/theatre-royal"
city = "New Plymouth"
conductor = "Mark Hodgkinson"
players = 71
works = [
  "*I never will* – a commissioned work by one of our players, [Dr Louise Webster](https://sounz.org.nz/contributors/1813)",
  "Mozart: *Clarinet concerto* (first movement), soloist Ryan Cha (final-year medical student)",
  "Elgar: *Pomp and Circumstance March No. 1*",
  "Brahms: *Symphony No. 2*",
]
image = "img/cards/2014.png"
banner = "img/banners/2014.jpg"
programme = "files/nzdo_concert_programme_2014.pdf"
poster = "files/poster.pdf"
donation = 4122.60
recipient = "Hospice Taranaki"
recipient_url = "https://www.hospicetaranaki.org.nz/"
sponsors = "We are grateful for sponsorship for student travel from the University of Otago division of humanities performing arts fund, and division of health sciences; and from the University of Auckland. MAS provided sponsorship for dinner for the students."
links = [
  { text = "Radio NZ Upbeat interview with Louise Webster about her commissioned work, and with Tim Wilkinson about the orchestra (audio)", url = "files/upbt-20140626-1303-tim_wilkinson_and_louise_webster_nz_doctors_orchestra-064.mp3" },
  { text = "Article in the Taranaki Daily News", url = "files/taranaki_daily_news.pdf" },
  { text = "Review of the concert", url = "files/review.pdf" },
]


[[concert]]
year = 2013
date = 2013-06-23
venue = "Nelson School of Music"
city = "Nelson"
conductor = "Mark Hodgkinson"
players = 74
works = [
  "Britten: *King Arthur* suite (movements 1 & 3)",
  "Sibelius: *Violin concerto* (first movement), soloist Dr David Choi (Auckland house surgeon)",
  "Saint-Saëns: *Organ Symphony*, soloist Dr Jonathan Christiansen (Auckland cardiologist)",
]
image = "img/cards/2013.jpg"
banner = "img/banners/2013.jpg"
programme = "files/nzdo_concert_programme_2013.pdf"
poster = "files/nzdo_poster_2013.pdf"
donation = 6658
recipient = "Nelson Tasman Hospice"
recipient_url = "https://www.nelsonhospice.org.nz/"
sponsors = "We are grateful for sponsorship for student travel from the University of Otago division of humanities performing arts fund, and division of health sciences. MAS provided sponsorship for dinner for the students."
youtube = "Kj-vpOW7YyQ"
links = [
  { text = "Article in the Nelson Mail", url = "files/nelson_mail.pdf" },
  { text = "Upbeat interview with David Choi (audio)", url = "files/upbt-20130620-1238-lynette_murdoch_and_david_choi-048.mp3" },
  { text = "Review of the concert", url = "files/nzdo_2013_review.pdf" },
]


[[concert]]
year = 2012
date = 2012-06-24
venue = "Nelson School of Music"
city = "Nelson"
conductor = "Mark Hodgkinson"
players = 65
note = "The inaugural concert received a standing ovation, having sold out 48 hours in advance. About one third of the players were medical students."
works = [
  "Lilburn: *Aotearoa* Overture",
  "Schumann: *Piano concerto* (first movement), soloist Adrian Secker (Nelson surgeon)",
  "Puccini: *O mio babbino caro* (from Gianni Schicchi) and *Chi il bel sogno di Doretta* (from La Rondine), soloist Tara Martin (Christchurch physiotherapist)",
  "Tchaikovsky: *Symphony No. 5*",
]
image = "img/cards/2012.jpg"
banner = "img/banners/2012.jpg"
programme = "files/nzdo_concert_programme_final.pdf"
poster = "files/nzdo_concert_poster.pdf"
donation = 6321.70
recipient = "Nelson Tasman Hospice"
recipient_url = "https://www.nelsonhospice.org.nz/"
sponsors = "MAS kindly provided financial assistance for students."
links = [
  { text = "Interview with Lynn Freeman on National Radio Arts on Sunday, 17 June 2012", url = "https://www.rnz.co.nz/national/programmes/artsonsunday/20120617" },
  { text = "National Radio pre-panel discussion, 19 June 2012", url = "https://www.rnz.co.nz/national/programmes/afternoons/audio/2522358/the-panel-pre-show-for-19-june-2012" },
  { text = "Interview with Eva Radich on Concert FM Upbeat, 20 June 2012", url = "https://www.rnz.co.nz/concert/programmes/upbeat/audio/2522458/tim-wilkinson" },
  { text = "Front page of the Nelson Mail, 21 June 2012", url = "http://www.stuff.co.nz/nelson-mail/7145061/Music-that-soothes-lifes-pains" },
  { text = "Nelson Mail clipping (PDF)", url = "files/nelson_mail.pdf" },
  { text = "Advertisement on local radio (audio)", url = "files/nz_doctors_orchestra-nsom.mp3" },
  { text = "Article in the University of Otago Bulletin, 13 July 2012", url = "files/obp5.pdf" },
  { text = "Article in On MAS, November 2012", url = "files/mas_article_nov_2012.pdf" },
]

# ✂ ────────────── edit above this line ──────────────
`);
