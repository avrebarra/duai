import * as React from "react";
import { Configuration, OpenAIApi } from "openai";
import { Link } from "react-router-dom";

import { Textarea, Input, Tooltip, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const APP_NAME = "duai";
const APP_DESCRIPTION = "Your wishes as Arabic duas. With AI.";
const APP_ICON_SRC = "https://em-content.zobj.net/source/microsoft-teams/337/palms-up-together_medium-light-skin-tone_1f932-1f3fc_1f3fc.png";
const LS_KEY_OPENAIKEY = "openapikey";

type Dua = {
  arabic?: string;
  pronounciation?: string;
  translation?: string;
};

type PropsNone = {};

export const FCScreenHome: React.FC<PropsNone> = ({}) => {
  const toast = useToast();

  const [tmpPrompt, setTmpPrompt] = React.useState<string>("");
  const [openAIKey, setOpenAIKey] = React.useState<string>("");
  const [showKey, setShowKey] = React.useState(false);

  const [prompt, setPrompt] = React.useState<string>("");
  const [iteration, setIteration] = React.useState<number>(0);
  const [prayer, setPrayer] = React.useState<Dua>({});

  const handleClickShowKey = () => setShowKey(!showKey);
  const handleAPIKeyUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setOpenAIKey(value);
    localStorage.setItem(LS_KEY_OPENAIKEY, value);
  };
  const handleClickReset = () => {
    setPrompt("");
    setIteration(0);
    setPrayer({});
  };
  const handleDataFailure = (msg: string) => {
    toast({
      title: "Failure occured",
      description: msg,
      status: "error",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    handleClickReset();
  };

  React.useEffect(() => {
    const openAPIKey = localStorage.getItem(LS_KEY_OPENAIKEY);
    if (openAPIKey) {
      setOpenAIKey(openAPIKey);
    }
  }, []);

  return (
    <>
      <img className="w-16" src={APP_ICON_SRC} alt="" />
      <div className="pb-4">
        <div className="font-bold text-5xl">
          <Link className="" to={`/`}>
            {APP_NAME}{" "}
          </Link>
        </div>
        <div className="pt-2 text-xl">{APP_DESCRIPTION}</div>
      </div>
      <div id="craft-section">
        <FCGuardShow show={prayer.arabic == undefined}>
          <div className="pb-4">
            <Tooltip
              label="No worries, we're not storing things to any server. Check out FAQs for more info."
              aria-label="A tooltip"
              hasArrow
              placement="bottom-end"
            >
              <InputGroup size="md" className="my-1">
                <Input
                  className="font-mono"
                  borderRadius={0}
                  type={showKey ? "text" : "password"}
                  placeholder="OpenAI API Key"
                  value={openAIKey}
                  onChange={handleAPIKeyUpdate}
                />
                <InputRightElement width="4.5rem">
                  <Button borderRadius={0} h="1.75rem" size="sm" onClick={handleClickShowKey}>
                    {showKey ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Tooltip>
            <Textarea
              className="my-1"
              borderRadius={0}
              placeholder="What you ask for?"
              onChange={(e) => setTmpPrompt(e.currentTarget.value)}
              value={tmpPrompt}
            />
          </div>
        </FCGuardShow>
      </div>
      <div id="dua-section">
        <FCGuardShow show={prompt != "" && prayer.arabic != undefined}>
          <div className="pt-4 pb-10">
            <div className="pb-2 font-serif font-medium text-2xl">{prayer.arabic}</div>
            <div className="pb-4 text-xl font-light text-emerald-700">{prayer.pronounciation}</div>
            <div className="">"{prayer.translation}"</div>
          </div>
        </FCGuardShow>
      </div>
      <div>
        {/* show when no prompt submitted */}
        <FCGuardShow show={!prompt}>
          <Button
            colorScheme="green"
            size={"md"}
            borderRadius={0}
            onClick={() => {
              setPrompt(tmpPrompt);
            }}
            css=""
          >
            Make Dua
          </Button>
        </FCGuardShow>

        {/* show when loading */}
        <FCGuardShow show={prompt != "" && !prayer.arabic}>
          <Button colorScheme="green" size={"md"} borderRadius={0} isLoading={true}>
            Loading
          </Button>
        </FCGuardShow>

        {/* show when prayer acquired */}
        <FCGuardShow show={prompt != "" && prayer.arabic != undefined}>
          <Button
            colorScheme="green"
            size={"md"}
            borderRadius={0}
            onClick={() => {
              setIteration(iteration + 1);
              setPrayer({});
            }}
          >
            Other Dua
          </Button>
          <Button
            colorScheme="yellow"
            size={"md"}
            borderRadius={0}
            onClick={() => {
              handleClickReset();
            }}
          >
            Reset
          </Button>
        </FCGuardShow>

        <span className="px-2">
          <Link to={`/faqs`}>
            <Button colorScheme="gray" size={"md"} borderRadius={0}>
              FAQs
            </Button>
          </Link>
        </span>
      </div>

      {/* data generator */}
      <FCDataDuaGenerator apikey={openAIKey} content={prompt} iteration={iteration} onDataLoaded={setPrayer} onFailure={handleDataFailure} />
    </>
  );
};

export const FCScreenFAQ: React.FC<PropsNone> = ({}) => {
  React.useEffect(() => {}, []);
  return (
    <>
      <FCTitle title="FAQs" />

      <FCFAQItem q="Why I make this?">
        I just kinda want to translate my prayers to Arabic. I used Google Translate at first but then it seems ChatGPT is better at writing it with
        pretty-pretty Arabic words.
      </FCFAQItem>

      <FCFAQItem q="What is OpenAI API key?">
        OpenAI API key is a unique identifier that is required to access OpenAI's GPT models and other AI technologies. It allows developers and
        researchers to integrate OpenAI's advanced AI capabilities into their own applications and workflows.
      </FCFAQItem>

      <FCFAQItem q="How to get OpenAI API key?">
        Go{" "}
        <u>
          <a href="https://platform.openai.com/account/api-keys">here</a>
        </u>
        . (need to register first if you haven't)
      </FCFAQItem>

      <FCFAQItem q="Will my key be safe?">
        The app is is using your key to make request to OpenAI, directly. We also cache your key in your browser's LocalStorage (clientside, not
        serverside) so you can continue between sessions without hassle. <br />
        <br />
        Other than that we don't use or access your key at all. You can validate this behavior by peeking directly to the{" "}
        <u>
          <a href="https://github.com/avrebarra/duai">source code</a>
        </u>
        .
        <br />
        <br />
        <strong>
          At last, for safety measure we suggest you create different API keys for each different apps so you can always revoke your key upon
          potential risks.
        </strong>
      </FCFAQItem>

      <FCFAQItem q="Is this halal?">
        Should be okay, but sunnah comes first. Find duas in shahih hadith first to preserve sunnahs and gain the most pahalas. If then you can't find
        any duas previously told by Prophet Muhammad PBUH that's matching your need, maybe you can use this.
      </FCFAQItem>

      <FCFAQItem q="Who created this?">Alien. Moslem alien.</FCFAQItem>
    </>
  );
};

// ***

type PropsFAQItem = {
  q: string;
  children: React.ReactNode;
};
export const FCFAQItem: React.FC<PropsFAQItem> = (p) => {
  React.useEffect(() => {}, []);
  return (
    <>
      <div className="mb-5">
        <div className="text-lg font-bold mb-1">{p.q}</div>
        <div className="text-normal max-w-md mb-2">{p.children}</div>
      </div>
    </>
  );
};

type PropsTitle = {
  title: string;
};
export const FCTitle: React.FC<PropsTitle> = (p) => {
  React.useEffect(() => {}, []);
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

type PropsGuardShow = {
  children: React.ReactNode;
  show: boolean;
};
export const FCGuardShow: React.FC<PropsGuardShow> = (p) => {
  if (!p.show) return null;
  return <>{p.children}</>;
};

type PropsDataDuaGenerator = {
  apikey: string;
  content: string;
  iteration?: number;
  onDataLoaded: (p: Dua) => void;
  onFailure: (msg: string) => void;
};
const FCDataDuaGenerator: React.FC<PropsDataDuaGenerator> = (p) => {
  const [prompt, setPrompt] = React.useState<string>("");

  const handleDataLoaded = (s: string) => {
    const prayer: Dua = JSON.parse(s);
    p.onDataLoaded(prayer);
  };

  React.useEffect(() => {
    if (!p.content) return;

    const newprompt = `
Generate ONE Islamic dua in 3 formats: Arabic (with harakats), English Pronounciation, and English Translation. Respond in exact JSON format:

Content of dua must be about: "${p.content}. Add Allahumma etc if needed."
JSON format to follow:
{
  "arabic": "اَللّٰهُمَّ",
  "pronounciation": "Allahumma",
  "translation": "Ya Allah"
}
This is attempt number: ${p.iteration}
`;
    setPrompt(newprompt);
  }, [p.content, p.iteration]);
  return (
    <>
      <FCDataOpenAICompletionGenerator apikey={p.apikey} onDataLoaded={handleDataLoaded} onFailure={p.onFailure} prompt={prompt} />
    </>
  );
};

type PropsDataOpenAICompletionGenerator = {
  apikey: string;
  prompt?: string;
  onDataLoaded: (data: string) => void;
  onFailure: (message: string) => void;
};
const FCDataOpenAICompletionGenerator: React.FC<PropsDataOpenAICompletionGenerator> = (p) => {
  React.useEffect(() => {
    if (!p.prompt) return;

    const fetchData = async () => {
      const configuration = new Configuration({
        apiKey: p.apikey,
      });

      const openai = new OpenAIApi(configuration);

      try {
        const result = await openai.createCompletion({
          model: "gpt-3.5-turbo-instruct",
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
