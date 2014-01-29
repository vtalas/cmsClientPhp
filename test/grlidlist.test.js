/*global GridList*/
describe("Describe", function () {
	var existingLink = "kontakt";
	function getGridList() {
		return new GridList(data, {set: function () {}});
	}
	beforeEach(function () {
	})
	it("get existing grid by link", function () {
		var gridlist = getGridList();
		var grid = gridlist.getGridByLink(existingLink);
		expect(grid.id).not.toBeNull();
	});

	it("get all pages", function () {
		var gridlist = getGridList();
		var pages = gridlist.getGridsByCategory("Page");
		expect(pages.length).toBeGreaterThan(1);

		console.log(pages[0].Name);
		console.log(JSON.stringify(pages[4]));
		console.log(pages[1].Type);

	})
});

var data = [
	{
		"Category": "Page",
		"Name": "projekty",
		"Link": "projekty",
		"id": "grid_1",
		"Edit": 0,
		"groups": {
			"groupName": "Typy Projektů",
			"items": [
				{
					"id": 0,
					"name": "prdel"
				},
				{
					"id": 1,
					"name": "aaa"
				},
				{
					"id": 3,
					"name": "cccc"
				},
				{
					"id": 4,
					"name": "aax"
				},
				{
					"id": 5,
					"name": "kabd baksjbd kjabsdjkb absdkjabskjdkjab kjdbakjsbk dbakjbdk jabbdkjabdkasd asd"
				}
			]
		},
		"GridElements": [
			{
				"Id": "el_22",
				"Type": "album",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"name": "xxsdfs jbsdjkksd fkjabsdkjha",
					"type": "typ jhbasdhhadsj xxxasdas",
					"services": "slyzbyx sadasd",
					"size": "rozsah",
					"year": "1999",
					"text": "asdasdasdsadsdsads\ntextkjbasd asdb kjasbd \naskdjbaskjd asd\n===\nlkasndlkans lknlknaslkn lknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslkndknaslkd klanlksnd lknasld nlknaslkn dlkaslknd lknlskanl knaslkndl knaslknd xvxbvxxxxx nxbnxxxxx",
					"map": {
						"lat": "49.214807",
						"lnt": "16.28238"
					},
					"group": 3
				},
				"Content": {
					"gdataAlbumId": "5574024902156833169",
					"name": "Album bez názvu",
					"updated": 1390254451221,
					"thumbnail": "https://lh4.googleusercontent.com:443/-leg5TNjjeeU/TVrqHbY9UZE/AAAAAAAAAqc/Ve3NgZA9rW0/h480-c/AlbumBezNazvu.jpg",
					"ratio": "ratio16_9"
				}
			},
			{
				"Width": 12,
				"Id": "fc3fdc23-27b1-40ef-5567-65e9ccb8c09b",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {
					"name": "asdasd",
					"group": 1,
					"type": "kasbd",
					"services": "asdasd",
					"year": "asdasd",
					"size": "asdasd"
				},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "be5f6c68-991b-fac6-b91f-7801dcdca9c0",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {
					"group": 1
				},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "f61e08e0-32be-9541-3acd-abb1388e3b62",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "ac0e9205-0da5-e1b5-5bca-2be027082649",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "72518087-236f-83c2-20b3-c280ecdff235",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "e94a74bf-00e2-dcd1-1e28-b7107f577dde",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "02ee2f6f-7b80-d158-1cc8-1d400725716a",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "21298069-8bbd-cbe4-fc62-3c50c1ed2d68",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "13207956-753c-3f20-4b38-03b0bbe88f07",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "12c370ca-0adb-c3e4-dc1b-362bec5f381b",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "2b0148ce-e372-c745-dc2f-95265fb84827",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "a942e69e-dec6-eb5b-a764-6d9c9d46eda4",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "5263793d-6ab6-4ddd-afad-39484e82322c",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "52bd3960-629a-9af8-1b77-17644755c023",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			},
			{
				"Width": 12,
				"Id": "ee2c597b-f52b-078e-29f1-99becc3e954d",
				"Content": {
					"ratio": "ratio3_4"
				},
				"resources": {},
				"Name": "",
				"Type": "album"
			}
		]
	},
	{
		"Category": "Page",
		"Name": "historie",
		"Link": "historie",
		"id": "grid_2",
		"GridElements": [
			{
				"Id": "el_2",
				"Type": "simplehtml",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"text": "1990 Založení akciové společnosti BOOS, a.s\n--\n  \n- projekční činnost\n- inženýrská činnost\n- generální dodávky staveb a interiérů\n- realitní činnost\n- dodávky a montáže bankovních technologií"
				}
			},
			{
				"Id": "el_3",
				"Type": "simplehtml",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"text": "1990 - 1999\n--\n- vytvoření samostatných kanceláří pro oblast Praha a Zlín"
				}
			},
			{
				"Id": "el_3",
				"Type": "simplehtml",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"text": "1999 založení společnosti BOOS Trade, s.r.o. \n--\n- společnost plně přebírá aktivity v oblasti dodávek a montáži bankovních technologií"
				}
			},
			{
				"Id": "el_5",
				"Type": "simplehtml",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"text": "2004 vytvoření samostatné sekce pro developerské projekty\n--"
				}
			},
			{
				"Id": "el_5",
				"Type": "simplehtml",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"text": "2009 vybudování samostatné pobočky v Uničově \n--\n  - **BOOS, a.s. – atelier Severní Morava**"
				}
			},
			{
				"Id": "el_6",
				"Type": "simplehtml",
				"Edit": 0,
				"Width": 12,
				"Content": "",
				"resources": {
					"text": "2013 vytvoření nové organizační struktury\t\n--\n  - **BOOS plan, a.s.**"
				}
			}
		]
	},
	{
		"Category": "Page",
		"Name": "kontakt",
		"Link": "kontakt",
		"id": "grid_3",
		"GridElements": [
			{
				"Id": "c2e3d403-ca57-eddb-ea57-629ea272b4db",
				"Type": "kontakt",
				"Name": "Kontakt",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"header": "HHheader11",
					"subheader": "Ssub header hsh hav jhvasjdhv jhvajv jhvasjdhvjhavsd ads",
					"valuea": "tel.: 6266253 982932",
					"valueb": "tel: 020802 09029",
					"valuec": "email: kjbasdkjbas@sbks.xz",
					"valued": "ggg",
					"valuee": "hhh",
					"valuef": "sssjjj",
					"map": {
						"lat": "49.214807",
						"lnt": "16.570445"
					}
				},
				"help": true
			},
			{
				"Id": "c2e3d403-ca57-eddb-ea57-sd",
				"Type": "kontakt",
				"Name": "Kontakt",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"header": "HHheader22",
					"subheader": "Ssub header",
					"valuea": "tel.: 6266253 982932",
					"valueb": "tel: 020802 09029",
					"valuec": "email: kjbasdkjbas@sbks.xz",
					"valued": "ggg",
					"valuee": "hhh",
					"valuef": "sssjjj"
				},
				"help": true
			},
			{
				"Id": "c2e3d403-ca57-eddb-ea57-23sd",
				"Type": "kontakt",
				"Name": "Kontakt",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"header": "",
					"subheader": "Ssub header33",
					"valuea": "tel.: 6266253 982932",
					"valueb": "tel: 020802 09029",
					"valuec": "email: kjbasdkjbas@sbks.xz",
					"valued": "",
					"valuee": "",
					"valuef": "sssjjj"
				},
				"help": true
			},
			{
				"Id": "c2e3d403-ca57-eddb-ea57-343xxx",
				"Type": "kontakt",
				"Name": "Kontakt",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"header": "",
					"subheader": "Ssub header44",
					"valuea": "tel.: 6266253 982932",
					"valueb": "tel: 020802 09029",
					"valuec": "email: kjbasdkjbas@sbks.xz",
					"valued": "ggg",
					"valuee": "hhh",
					"valuef": "sssjjj"
				},
				"help": true
			},
			{
				"Id": "e94eb269-209d-ad2b-cc02-03aa573af5d9",
				"Type": "kontakt",
				"Name": "Kontakt",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"header": "havsdhvjds",
					"subheader": "adasd55",
					"valuea": "tel: 028028302080",
					"valueb": "tel: 9829389232",
					"valuec": "email: jbsdjf@jjs.cz"
				}
			}
		],
		"Edit": 0
	},
	{
		"Category": "Page",
		"Name": "cinnost",
		"Link": "cinnost",
		"id": "grid_4",
		"Edit": 0,
		"GridElements": [
			{
				"Id": "el_1",
				"Type": "simplehtml",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"text": "Náš projekční tým lze vystihnout těmito slovy: maximální nasazení, **zkušenosti, flexibilita, slušnost, odpovědnost**.\n\nProjekty naší společnosti se vyznačují perfektním zvládnutím prostoru, citem pro architektonický detail. Veškerá dokumentace je vždy vyhotovena podle platné legislativy, popř. podrobněji na přání investora. Disponujeme celou řadou odborníků ze všech odvětví projekční činnosti. Spolupracujeme s experty a nezávislými subjekty \nz oboru stavebního zkušebnictví, stavebních, geologických a jiných průzkumů.\n\nNabízíme veškeré služby spojené s projekční činností a **všemi etapami projektu:**\n\n  - studie záměru vč. posouzení investiční náročnosti\n  - architektonický návrh a funkční řešení objektu \n    - předprojektová příprava zahrnující průzkum lokality a stanovení rizik\n    - vizualizace a jiné formy prezentace projektu\n    - vypracování projektové dokumentace pro územní řízení\n    - inženýrská činnost pro všechna vyžadovaná řízení\n    - vypracování projektové dokumentace pro stavební řízení\n    - vypracování projektové dokuemntace pro výběr zhotovitele\n    - realizační projektová dokumentace\n  - spolupráce při realizaci stavby\n  - výkon autorského dozoru, popř. technického dozoru investora\n  - projektová dokumentace skutečného provedení stavby\n  - inženýrská činnost potřebná pro uvedení stavby do provozu\n\nREFERENCE\n---\n  - mnohaleté zkušenosti s projekční činností v tuzemsku i mimo území ČR \n  - stovky realizovaných staveb nejrůznějších objemů a charakteru\n  - reference od nadnárodních koncernů i drobných investorů – viz. seznam klientů"
				}
			}
		]
	},
	{
		"Category": "Page",
		"Name": "aaa",
		"Link": "galerie",
		"id": "grid_5",
		"GridElements": [
			{
				"Id": "el_1",
				"Type": "text",
				"Edit": 0,
				"Width": 12,
				"resources": {
					"text": "sadasd"
				}
			}
		]
	}
]