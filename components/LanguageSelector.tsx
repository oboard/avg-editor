import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectLanguage, setLanguage } from "@/stores/store";

export enum I18nContent {
  zh_CN = "zh_CN",
  en_US = "en_US",
}

export default function LanguageSelector() {
  const lang = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  return (
    <select
      value={lang}
      onChange={(e) => {
        dispatch(setLanguage(e.target.value as I18nContent));
        // setLang(e.target.value as I18nContent);
      }}
      className="absolute z-10 select select-sm select-bordered"
    >
      <option value={I18nContent.zh_CN}>中文</option>
      <option value={I18nContent.en_US}>English</option>
    </select>
  );
}
