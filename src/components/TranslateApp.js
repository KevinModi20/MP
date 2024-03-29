import { useEffect, useState } from 'react';
import lang from '../languages';
// import './Translator.css';

function Translator() {

    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en-GB');
    const [toLanguage, setToLanguage] = useState('hi-IN');
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLanguages(lang);
    }, []);

    const copyContent = (text) => {
        navigator.clipboard.writeText(text);
    }

    const utterText = (text, language) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        synth.speak(utterance);
    }

    const handleExchange = () => {
        let tempValue = fromText;
        setFromText(toText);
        setToText(tempValue);

        let tempLang = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(tempLang);
    };

    const handleTranslate = () => {
        setLoading(true);
        let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setToText(data.responseData.translatedText);
                setLoading(false);
            });
    };

    const handleIconClick = (target, id) => {
        if (!fromText || !toText) return;

        if (target.classList.contains('fa-copy')) {
            if (id === 'from') {
                copyContent(fromText);
            } else {
                copyContent(toText);
            }
        } else {
            if (id === 'from') {
                utterText(fromText, fromLanguage);
            } else {
                utterText(toText, toLanguage);
            }
        }
    };



    return (
        <>
            <div className='flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500 min-h-[91vh]' >
                <div className='max-w-screen-md w-full bg-white rounded-lg p-8 shadow-md '>
                    <div className="rounded-lg border border-gray-300">
                        <div className="flex border-b border-gray-300 ">
                            <textarea name="from" className=" border-r border-gray-300 h-60 w-full   outline-none rounded-md resize-none p-3 text-xl" placeholder="Enter Text" id="from" value={fromText} onChange={(e) => setFromText(e.target.value)}></textarea>
                            <textarea name="to" className=" rounded-r-lg border-l border-gray-300 h-60 w-full  outline-none rounded-lg resize-none p-3 text-xl" id="to" value={toText} readonly></textarea>
                        </div>
                        <ul className=" flex items-center justify-between cursor-pointer">
                            <li className=" flex items-center justify-between cursor-pointer ">
                                <div className="  border-r border-gray-300 flex items-center justify-between cursor-pointer pl-4">
                                    <i id="from" className="material-symbols-outlined w-10 h-10 text-base text-gray-400  flex items-center justify-between cursor-pointer" onClick={(e) => handleIconClick(e.target, 'from')}>volume_up</i>
                                    <i id="from" className=" material-symbols-outlined  w-10 h-10 text-base text-gray-400 flex items-center justify-between cursor-pointer" onClick={(e) => handleIconClick(e.target, 'from')}>content_copy
                                    </i>

                                </div>
                                <select className='text-gray-700  outline-none text-lg p-3  mr-5 ' value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                                    {Object.entries(languages).map(([code, name]) => (
                                        <option key={code} value={code}>
                                            {name}
                                        </option>
                                    ))}
                                </select>

                            </li>
                            <li className="flex items-center justify-between cursor-pointer" onClick={handleExchange}>
                                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                            </li>
                            <li className=" flex items-center justify-between cursor-pointer">
                                <select className='text-gray-700 border-none outline-none text-lg p-3  mr-5 ml-4' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                                    {Object.entries(languages).map(([code, name]) => (
                                        <option key={code} value={code}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <div className=" pl-4 border-l border-gray-300 flex items-center justify-between cursor-pointer">
                                    <i id="to" className="material-symbols-outlined w-10 h-10 text-base text-gray-400  flex items-center justify-between cursor-pointer" onClick={(e) => handleIconClick(e.target, 'to')}>content_copy</i>
                                    <i id="to" className=" material-symbols-outlined w-10 h-10 text-base text-gray-400 flex items-center justify-between cursor-pointer" onClick={(e) => handleIconClick(e.target, 'to')}>volume_up</i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button className='w-full p-4 border-none text-white cursor-pointer mt-5 rounded-lg text-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500' onClick={handleTranslate} disabled={loading}>
                        {loading ? 'Translating...' : 'Translate Text'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Translator;



// 
