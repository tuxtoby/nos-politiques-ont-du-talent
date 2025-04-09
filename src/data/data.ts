import { Politician } from "../types/Politician";

export const data: Politician[] = [
    {
        "name": "Jean-Marie Lepen",
        "politicalGroup": "RN",
        "politicalSide": "far-right",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Le_Pen_Jean-Marie_1999.jpg/1200px-Le_Pen_Jean-Marie_1999.jpg",
        "sentences": [
            {
                "type": "corruption",
                "fine": 2000,
                "prisonTime": 12,
                "date": "2010-01-01",
                "source": "https://www.jmlepen.com/"
            },
            {
                "type": "fraud",
                "fine": 30000,
                "prisonTime": 6,
                "date": "2015-03-02",
                "source": "https://www.jmlepen.com/"
            }
        ]
    },
    {
        "name": "François Hollande",
        "politicalGroup": "PS",
        "politicalSide": "left",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Fran%C3%A7ois_Hollande_-_2017_%2827869823159%29_%28cropped_2%29.jpg/1200px-Fran%C3%A7ois_Hollande_-_2017_%2827869823159%29_%28cropped_2%29.jpg",
        "sentences": [
            {
                "type": "fraud",
                "fine": 50000,
                "prisonTime": 2,
                "date": "2018-02-02"
            },
            {
                "type": "misuse-of-funds",
                "fine": 35000,
                "prisonTime": 0,
                "date": "2019-05-15",
                "source": "https://example.com/hollande-case"
            }
        ]
    },
    {
        "name": "Nicolas Sarkozy",
        "politicalGroup": "LR",
        "politicalSide": "right",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Nicolas_Sarkozy_in_2010.jpg",
        "sentences": [
            {
                "type": "corruption",
                "fine": 75000,
                "prisonTime": 3,
                "date": "2021-03-01",
                "source": "https://example.com/sarkozy-case"
            },
            {
                "type": "illegal-campaign-funding",
                "fine": 100000,
                "prisonTime": 1,
                "date": "2021-09-30",
                "source": "https://example.com/bygmalion"
            },
            {
                "type": "influence-peddling",
                "fine": 120000,
                "prisonTime": 2,
                "date": "2023-06-15",
                "source": "https://example.com/sarkozy-influence"
            }
        ]
    },
    {
        "name": "Marine Le Pen",
        "politicalGroup": "RN",
        "politicalSide": "far-right",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Le_Pen%2C_Marine-9586_%28cropped%29.jpg",
        "sentences": [
            {
                "type": "misuse-of-funds",
                "fine": 45000,
                "prisonTime": 0,
                "date": "2022-06-15",
                "source": "https://example.com/mlp-case"
            },
            {
                "type": "illegal-campaign-funding",
                "fine": 80000,
                "prisonTime": 1,
                "date": "2023-11-30",
                "source": "https://example.com/mlp-campaign"
            }
        ]
    },
    {
        "name": "Jean-Luc Mélenchon",
        "politicalGroup": "LFI",
        "politicalSide": "far-left",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Jean-Luc_MELENCHON_2016_2_%28cropped%29.jpg",
        "sentences": [
            {
                "type": "obstruction",
                "fine": 25000,
                "prisonTime": 0,
                "date": "2019-12-09",
                "source": "https://example.com/melenchon-case"
            },
            {
                "type": "defamation",
                "fine": 15000,
                "prisonTime": 0,
                "date": "2022-03-20",
                "source": "https://example.com/melenchon-defamation"
            }
        ]
    },
    {
        "name": "Éric Woerth",
        "politicalGroup": "LR",
        "politicalSide": "right",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/%C3%89ric_Woerth_2.jpg/1200px-%C3%89ric_Woerth_2.jpg",
        "sentences": [
            {
                "type": "influence-peddling",
                "fine": 60000,
                "prisonTime": 2,
                "date": "2020-08-20",
                "source": "https://example.com/woerth-case"
            },
            {
                "type": "tax-fraud",
                "fine": 85000,
                "prisonTime": 3,
                "date": "2021-11-05",
                "source": "https://example.com/woerth-tax"
            }
        ]
    },
    {
        "name": "François Bayrou",
        "politicalGroup": "MoDem",
        "politicalSide": "center",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Fran%C3%A7ois_Bayrou_%28L%C3%A9gislatives_2024%29.jpg/250px-Fran%C3%A7ois_Bayrou_%28L%C3%A9gislatives_2024%29.jpg",
        "sentences": [
            {
                "type": "misappropriation",
                "fine": 70000,
                "prisonTime": 1,
                "date": "2020-12-15",
                "source": "https://example.com/bayrou-case"
            },
            {
                "type": "illegal-funding",
                "fine": 95000,
                "prisonTime": 2,
                "date": "2022-07-08",
                "source": "https://example.com/bayrou-funding"
            }
        ]
    },
    {
        "name": "Ségolène Royal",
        "politicalGroup": "PS",
        "politicalSide": "left",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/2/25/Royal_Toulouse_2012.JPG",
        "sentences": [
            {
                "type": "embezzlement",
                "fine": 55000,
                "prisonTime": 1,
                "date": "2021-04-12",
                "source": "https://example.com/royal-case"
            },
            {
                "type": "misuse-of-public-funds",
                "fine": 40000,
                "prisonTime": 0,
                "date": "2023-02-28",
                "source": "https://example.com/royal-funds"
            }
        ]
    },
    {
        "name": "Patrick Balkany",
        "politicalGroup": "LR",
        "politicalSide": "right",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/31/Resize_800px-Balkany_au_tribunal.jpg",
        "sentences": [
            {
                "type": "tax-fraud",
                "fine": 150000,
                "prisonTime": 5,
                "date": "2019-09-13",
                "source": "https://example.com/balkany-tax"
            },
            {
                "type": "money-laundering",
                "fine": 200000,
                "prisonTime": 4,
                "date": "2020-03-04",
                "source": "https://example.com/balkany-laundering"
            },
            {
                "type": "corruption",
                "fine": 180000,
                "prisonTime": 3,
                "date": "2022-01-27",
                "source": "https://example.com/balkany-corruption"
            }
        ]
    },
    {
        "name": "Isabelle Balkany",
        "politicalGroup": "LR",
        "politicalSide": "right",
        "photo": "https://images.rtl.fr/~c/2000v2000/rtl/www/1161675-isabelle-balkany-le-15-avril-2019.jpg",
        "sentences": [
            {
                "type": "tax-fraud",
                "fine": 120000,
                "prisonTime": 4,
                "date": "2019-09-13",
                "source": "https://example.com/i-balkany-tax"
            },
            {
                "type": "money-laundering",
                "fine": 150000,
                "prisonTime": 3,
                "date": "2020-03-04",
                "source": "https://example.com/i-balkany-laundering"
            }
        ]
    }
]