import * as React from "react";
import { Configuration, OpenAIApi } from "openai";
import { Link } from "react-router-dom";

import { Textarea, Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";

const APP_NAME = "lafazdiz";
const APP_DESCRIPTION = "Convert your prayers to Arabic lafadz. With AI.";
const APP_ICON_SRC = "https://em-content.zobj.net/source/microsoft-teams/337/palms-up-together_medium-light-skin-tone_1f932-1f3fc_1f3fc.png";

type PropsNone = {};

export const ScreenHome: React.FC<PropsNone> = ({}) => {
  const toast = useToast();
  const [tmpPrompt, setTmpPrompt] = React.useState<string>("");
  const [openAIKey, setOpenAIKey] = React.useState<string>("");
  const [showKey, setShowKey] = React.useState(false);

  const [prompt, setPrompt] = React.useState<string>("");
  const [iteration, setIteration] = React.useState<number>(0);
  const [prayer, setPrayer] = React.useState<Prayer>({});

  const handleClick = () => setShowKey(!showKey);
  const reset = () => {
    setPrompt("");
    setIteration(0);
    setPrayer({});
  };
  const handleFailure = (msg: string) => {
    toast({
      title: "Failure occured",
      description: msg,
      status: "error",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    reset();
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <img className="w-16" src={APP_ICON_SRC} alt="" />
      <div className="pb-4">
        <div className="font-bold text-4xl">
          <Link className="" to={`/`}>
            {APP_NAME}{" "}
          </Link>
        </div>
        <div className="pt-2 text-xl">{APP_DESCRIPTION}</div>
      </div>
      <div id="craft-section">
        <GuardShow show={prayer.arabic == undefined}>
          <div className="pb-4">
            <InputGroup size="md" className="my-1">
              <Input
                className="font-mono"
                borderRadius={0}
                type={showKey ? "text" : "password"}
                placeholder="OpenAI API Key"
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.currentTarget.value)}
              />
              <InputRightElement width="4.5rem">
                <Button borderRadius={0} h="1.75rem" size="sm" onClick={handleClick}>
                  {showKey ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Textarea className="my-1" borderRadius={0} placeholder="What you ask for?" onChange={(e) => setTmpPrompt(e.currentTarget.value)} />
          </div>
        </GuardShow>
      </div>
      <div id="dua-section">
        <GuardShow show={prompt != "" && prayer.arabic != undefined}>
          <div className="pt-4 pb-10">
            <div className="pb-2 font-serif font-medium text-2xl">{prayer.arabic}</div>
            <div className="pb-4 text-xl font-light text-emerald-700">{prayer.spelling}</div>
            <div className="">"{prayer.meaning}"</div>
          </div>
        </GuardShow>
      </div>
      <div>
        {/* show when no prompt submitted */}
        <GuardShow show={!prompt}>
          <Button
            colorScheme="green"
            size={"md"}
            borderRadius={0}
            onClick={() => {
              setPrompt(tmpPrompt);
            }}
          >
            Submit
          </Button>
        </GuardShow>

        {/* show when loading */}
        <GuardShow show={prompt != "" && !prayer.arabic}>
          <Button colorScheme="green" size={"md"} borderRadius={0} isLoading={true}>
            Loading
          </Button>
        </GuardShow>

        {/* show when prayer acquired */}
        <GuardShow show={prompt != "" && prayer.arabic != undefined}>
          <Button
            colorScheme="green"
            size={"md"}
            borderRadius={0}
            onClick={() => {
              setIteration(iteration + 1);
              setPrayer({});
            }}
          >
            Give Another
          </Button>
          <Button
            colorScheme="yellow"
            size={"md"}
            borderRadius={0}
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
        </GuardShow>

        <span className="px-2">
          <Link to={`/faqs`}>
            <Button colorScheme="gray" size={"md"} borderRadius={0}>
              FAQs
            </Button>
          </Link>
        </span>
      </div>

      {/* data generator */}
      <DataPrayerGenerator apikey={openAIKey} content={prompt} iteration={iteration} onDataLoaded={setPrayer} onFailure={handleFailure} />
    </>
  );
};

export const ScreenFAQ: React.FC<PropsNone> = ({}) => {
  const [readiness, setReadiness] = React.useState<boolean>(false);

  // effects
  React.useEffect(() => {}, []);

  return (
    <>
      <Title title="faqs" />

      <FAQItem q="Why I make this?" a="I just need to convert my prayers to Arabic so I can recite it within my salahs." />

      <FAQItem q="Who created this?" a="Aliens. Moslem aliens." />
    </>
  );
};

// ***

type FAQItemProps = {
  q: string;
  a: string;
};
export const FAQItem: React.FC<FAQItemProps> = (p) => {
  const [readiness, setReadiness] = React.useState<boolean>(false);

  React.useEffect(() => {}, [readiness]);

  return (
    <>
      <div className="mb-5">
        <div className="text-lg font-bold mb-1">{p.q}</div>
        <div className="text-normal max-w-md mb-2">{p.a}</div>
      </div>
    </>
  );
};

type TitleProps = {
  title: string;
};
export const Title: React.FC<TitleProps> = (p) => {
  const [readiness, setReadiness] = React.useState<boolean>(false);

  React.useEffect(() => {}, [readiness]);

  return (
    <>
      <div className="text-4xl ">
        <Link className="py-2" to={`/`}>
          <span className="font-light">« </span>
        </Link>
        <span className="font-semibold">{p.title}</span>
      </div>
      <br />
    </>
  );
};

type GuardShowProps = {
  children: React.ReactNode;
  show: boolean;
};
export const GuardShow: React.FC<GuardShowProps> = (p) => {
  if (!p.show) return null;
  return <>{p.children}</>;
};

type Prayer = {
  arabic?: string;
  spelling?: string;
  meaning?: string;
};
type DataPrayerGeneratorProps = {
  apikey: string;
  content: string;
  iteration?: number;
  onDataLoaded: (p: Prayer) => void;
  onFailure: (msg: string) => void;
};
const DataPrayerGenerator: React.FC<DataPrayerGeneratorProps> = (p) => {
  const [prompt, setPrompt] = React.useState<string>("");
  const onDataLoaded = (s: string) => {
    const prayer: Prayer = JSON.parse(s);
    p.onDataLoaded(prayer);
  };

  React.useEffect(() => {
    if (!p.content) return;

    const newprompt = `
Generate ONE Islamic prayer in Arabic (must be with harakats), spelling, and meaning to pray within Salah, and respond in exact JSON format:

Language: Arabic and English
Prayer content must be about: "${p.content}. Add Allahumma or such if needed."
JSON format to follow:
{
  "arabic": "اَللّٰهُمَّ",
  "spelling": "Allahumma",
  "meaning": "Ya Allah"
}
This is attempt number: ${p.iteration}
`;
    setPrompt(newprompt);
  }, [p.content, p.iteration]);
  return (
    <>
      <DataChatGPTPrompt apikey={p.apikey} onDataLoaded={onDataLoaded} onFailure={p.onFailure} prompt={prompt} />
    </>
  );
};

type DataChatGPTPromptProps = {
  apikey: string;
  prompt?: string;
  onDataLoaded: (data: string) => void;
  onFailure: (message: string) => void;
};

const DataChatGPTPrompt: React.FC<DataChatGPTPromptProps> = (p) => {
  React.useEffect(() => {
    if (!p.prompt) return;

    const fetchData = async () => {
      const configuration = new Configuration({
        apiKey: p.apikey,
      });

      const openai = new OpenAIApi(configuration);

      try {
        const result = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: p.prompt,
          temperature: 0.5,
          max_tokens: 1000,
        });
        console.log(result.data.choices[0].text);
        p.onDataLoaded(result.data.choices[0].text || "no response acquired");
      } catch (e) {
        p.onFailure(String(e));
      }
    };
    fetchData();
  }, [p.prompt]);

  return <></>;
};
