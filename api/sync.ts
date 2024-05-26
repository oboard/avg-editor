const api_root = "https://weblate.milthm.cn/api";
// const project_name = "test";
// const component_name = "test-project";

const units_api = (
  project_name: string,
  component_name: string,
  language_code: string
) =>
  `${api_root}/translations/${project_name}/${component_name}/${language_code}/units/`;

export interface UnitsInfo {
  count: number;
  next: string | null;
  previous: string | null;
  results: UnitInfo[];
}

export interface UnitInfo {
  translation: string;
  source: string[];
  previous_source: string;
  target: string[];
  id_hash: number;
  content_hash: number;
  location: string;
  context: string;
  note: string;
  flags: string;
  labels: string[];
  state: number;
  fuzzy: boolean;
  translated: boolean;
  approved: boolean;
  position: number;
  has_suggestion: boolean;
  has_comment: boolean;
  has_failing_check: boolean;
  num_words: number;
  source_unit: string;
  priority: number;
  id: number;
  web_url: string;
  url: string;
  explanation: string;
  extra_flags: string;
  pending: boolean;
  timestamp: string;
}

export async function getUnitsInfo(
  project_name: string,
  component_name: string,
  language_code: string
): Promise<UnitsInfo> {
  const url = units_api(project_name, component_name, language_code);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//   {
//     "count": 3,
//     "next": null,
//     "previous": null,
//     "results": [
//         {
//             "translation": "http://weblate.milthm.cn/api/translations/test/test-project/en/",
//             "source": [
//                 "test"
//             ],
//             "previous_source": "",
//             "target": [
//                 "test"
//             ],
//             "id_hash": -648370842291480792,
//             "content_hash": -4294227979123926682,
//             "location": "",
//             "context": "test",
//             "note": "",
//             "flags": "",
//             "labels": [],
//             "state": 20,
//             "fuzzy": false,
//             "translated": true,
//             "approved": false,
//             "position": 1,
//             "has_suggestion": false,
//             "has_comment": false,
//             "has_failing_check": false,
//             "num_words": 1,
//             "source_unit": "http://weblate.milthm.cn/api/units/3559/",
//             "priority": 100,
//             "id": 3559,
//             "web_url": "http://weblate.milthm.cn/translate/test/test-project/en/?checksum=77008627767ed728",
//             "url": "http://weblate.milthm.cn/api/units/3559/",
//             "explanation": "",
//             "extra_flags": "",
//             "pending": false,
//             "timestamp": "2024-05-21T14:44:48.071574Z"
//         },

//     ]
// }
