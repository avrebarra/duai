import * as React from "react";
import { Link } from "react-router-dom";

import { Textarea, Input, Button } from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

const APP_NAME = "lafazdiz";
const APP_DESCRIPTION = "Recraft your prayers to Arabic phrases. With AI.";
const APP_ICON_SRC = "https://em-content.zobj.net/source/microsoft-teams/337/palms-up-together_medium-light-skin-tone_1f932-1f3fc_1f3fc.png";

type PropsNone = {};

export const ScreenHome: React.FC<PropsNone> = ({}) => {
  const [readiness, setReadiness] = React.useState<boolean>(false);

  React.useEffect(() => {}, []);

  return (
    <>
      <img className="w-16" src={APP_ICON_SRC} alt="" />
      <div className="py-4">
        <div className="font-bold text-4xl">
          <Link className="" to={`/`}>
            {APP_NAME}{" "}
          </Link>
        </div>
        <div className="text-2xl">{APP_DESCRIPTION}</div>
      </div>
      <div>
        <Link to={`/craft`}>
          <Button size="lg" borderRadius={0}>
            Craft New
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/faqs`}>
          <Button colorScheme="gray" size={"lg"} borderRadius={0}>
            Open the FAQs
          </Button>
        </Link>
      </div>
    </>
  );
};
export const ScreenCraft: React.FC<PropsNone> = ({}) => {
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<string>("output");
  const [outArabic, setOutArabic] = React.useState<string>("بسم الله");
  const [outLafaz, setOutLafaz] = React.useState<string>("bismillah");
  const [outMeaning, setOutMeaning] = React.useState<string>("In the name of Allah");

  React.useEffect(() => {}, []);

  return (
    <>
      <Title title="craft" />

      <GuardShow show={step == "input"}>
        <div className="pb-4">
          <Textarea borderRadius={0} placeholder="What you ask for?" />
        </div>
      </GuardShow>

      <GuardShow show={step == "output"}>
        <div className="pb-4">
          <Textarea borderRadius={0} isReadOnly={true} value={outArabic} />
          <Textarea borderRadius={0} isReadOnly={true} value={outLafaz} />
          <Textarea borderRadius={0} isReadOnly={true} value={outMeaning} />
        </div>
      </GuardShow>

      <div>
        <Button size="lg" borderRadius={0}>
          Submit
        </Button>
        <GuardShow show={step == "output"}>
          <Button size="lg" borderRadius={0}>
            Reset
          </Button>
        </GuardShow>
      </div>
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
