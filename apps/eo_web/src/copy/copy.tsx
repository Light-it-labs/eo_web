import { type ElementType, type ReactNode } from "react";

import { icons } from "@eo/ui";

export type CarrouselItem = {
  step: string;
  title: string;
  content: string | ReactNode;
  icon: ElementType;
};

export const CarrouselItems: CarrouselItem[] = [
  {
    step: "STEP 1",
    title: "Profile & subscribe",
    content:
      "In 5-10 minutes, you can share the key information our clinical team needs to create your initial plan.",
    icon: icons.ProfileIconWhite,
  },
  {
    step: "STEP 2",
    title: "Get your care plan",
    content:
      "In under 24 hours, you’ll receive an email with a link to your personalized, clinician-approved care plan.",
    icon: icons.HandHeartWhite,
  },
  {
    step: "STEP 3",
    title: "Get your products",
    content:
      "You can order your recommended products online for easy home delivery. There’s no need to visit a dispensary.",
    icon: icons.PillsWhite,
  },
  {
    step: "STEP 4",
    title: "Provide feedback",
    content:
      "As you use your recommended products per the directions in your care plan, we’ll check in regularly and ask you to complete brief, periodic surveys.",
    icon: icons.FeedBackWhite,
  },
  {
    step: "STEP 5",
    title: "Get refined plans",
    content:
      "Early on, we’ll provide updated plans every 3-7 days based on your inputs. We’ll then regularly tune your plan for efficacy, safety and affordability.",
    icon: icons.CalendarChecked,
  },
  {
    step: "ALWAYS",
    title: "Be supported",
    content:
      "You can message our clinical team anytime as needs or questions arise - as often as you like. We’ll respond in under 24 hours - and usually within minutes.",
    icon: icons.SupportIconWhite,
  },
];

export type Copy = {
  title: string;
  content: string | ReactNode;
};

export const partnerFlowFaqs: Copy[] = [
  {
    title: "How much does an EO care plan cost?",
    content:
      "As a valued member of our community, your care is completely free. This includes your clinician-reviewed plan, ongoing plan optimization based on your feedback and unlimited phone calls and in-app messaging with our care team. All you pay for are your products.",
  },
  {
    title: "How do I get my products?",
    content:
      "Recommended CBD and Delta-9 THC products can be ordered through your care plan for home delivery. They are delivered just like any other package you might receive from the USPS or others.",
  },
  {
    title:
      "How long should it take my clinical and member services teams to respond to a message, email or phone question/ inquiry?",
    content: "No more than 24 hours and typically within 2-3 hours.",
  },
  {
    title:
      "Why can’t I see my initial care plan as soon as I submit my profile information? ",
    content:
      "Every profile submitted and piece of feedback provided is initially assessed by our proprietary data model and a draft care plan or care plan update is created. That plan is then closely reviewed and edited as needed by a licensed EO clinician. This can take as long as 24 hours or this can take as little as an hour, depending on the complexity of your profile, your care plan and clinician availability.",
  },
  {
    title:
      "How do you decide which products, doses and times of use are most right for me?",
    content: (
      <>
        The EO data model and your clinical team bases all recommendations on
        relevant aspects of your medical history, cannabis use history, your
        daily schedule and the feedback you provide as you use your care plan.
        <br />
        <br />
        The model and your team also considers the profiles, experiences and
        feedback provided by other EO patients like you and the recommendations
        of our proprietary data model. And your clinical team (of course) always
        draws upon their extensive cannabis treatment and research experience to
        provide the best possible care for you.
      </>
    ),
  },
  {
    title: "What happens if I miss a dose?",
    content: "Just take your next dose as scheduled!",
  },
  {
    title: "What happens if I’m late taking a dose?",
    content:
      "If you’re less than 30 minutes late, go ahead and take your scheduled dose (also be sure to take the next dose at the originally scheduled time). If you’re more than 30 minutes late just wait for your next scheduled dose.",
  },
  {
    title: "What happens if I miss an opportunity to provide feedback?",
    content:
      "Needless to say, the more feedback you provide, the better we can care for you. However, we know sometimes schedules change and life happens. If you can’t provide feedback when prompted, don’t worry. Just keep going as guided.",
  },
  {
    title: "How long should it take to get my cannabis regimen “right”?",
    content: (
      <>
        Everyone is different when it comes to the time it takes to reach
        satisfaction with a care plan. For some, all it takes is a few days or a
        week or two. For others, it can take longer.
        <br />
        <br />
        It’s important to note, however, that very few people retain a static
        relationship to cannabis for long periods of time. Products, doses and
        times of use typically change as your reasons for use, symptoms,
        cannabis tolerance, body and daily schedule evolves.
        <br />
        <br />
        As your feedback and needs change, we’ll be with you to alter and
        optimize your care plan, guide your care and answer your questions.
      </>
    ),
  },
  {
    title:
      "What if I need a cannabis product that’s more potent than the ones that EO provides?",
    content:
      "If you’d like more potent non-EO products to be included in your care plan, just email us at support@eo.care or call 888-823-6143. We’ll do everything we can to accommodate your request.",
  },
];

export const paidFaqs: Copy[] = [
  {
    title: "How much does EO cost?",
    content:
      "EO costs $14 per month for your clinician-reviewed plan, ongoing plan optimization based on your feedback and unlimited phone calls and in-app messaging with our care team. You can cancel your subscription any time. Note that the cost of your recommended products is NOT included in your plan.",
  },
  {
    title: "How do I get my products?",
    content:
      "Recommended CBD and Delta-9 THC products can be ordered through your care plan for home delivery. They are delivered just like any other package you might receive from the USPS or others.",
  },
  {
    title:
      "How long should it take my clinical and member services teams to respond to a message, email or phone question/ inquiry?",
    content: "No more than 24 hours and typically within 2-3 hours.",
  },
  {
    title:
      "Why can’t I see my initial care plan as soon as I submit my profile information? ",
    content:
      "Every profile submitted and piece of feedback provided is initially assessed by our proprietary data model and a draft care plan or care plan update is created. That plan is then closely reviewed and edited as needed by a licensed eo clinician. This can take as long as 24 hours or this can take as little as an hour, depending on the complexity of your profile, your care plan and clinician availability.",
  },
  {
    title:
      "How do you decide which products, doses and times of use are most right for me?",
    content: (
      <>
        The EO data model and your clinical team bases all recommendations on
        relevant aspects of your medical history, cannabis use history, your
        daily schedule and the feedback you provide as you use your care plan.
        <br />
        <br />
        The model and your team also considers the profiles, experiences and
        feedback provided by other EO patients like you and the recommendations
        of our proprietary data model. And your clinical team (of course) always
        draws upon their extensive cannabis treatment and research experience to
        provide the best possible care for you.
      </>
    ),
  },
  {
    title: "What happens if I miss a dose?",
    content: "Just take your next dose as scheduled!",
  },
  {
    title: "What happens if I’m late taking a dose?",
    content:
      "If you’re less than 30 minutes late, go ahead and take your scheduled dose (also be sure to take the next dose at the originally scheduled time). If you’re more than 30 minutes late just wait for your next scheduled dose.",
  },
  {
    title: "What happens if I miss an opportunity to provide feedback?",
    content:
      "Needless to say, the more feedback you provide, the better we can care for you. However, we know sometimes schedules change and life happens. If you can’t provide feedback when prompted, don’t worry. Just keep going as guided.",
  },
  {
    title: "How long should it take to get my cannabis regimen “right”?",
    content: (
      <>
        Everyone is different when it comes to the time it takes to reach
        satisfaction with a care plan. For some, all it takes is a few days or a
        week or two. For others, it can take longer.
        <br />
        <br />
        It’s important to note, however, that very few people retain a static
        relationship to cannabis for long periods of time. Products, doses and
        times of use typically change as your reasons for use, symptoms,
        cannabis tolerance, body and daily schedule evolves.
        <br />
        <br />
        As your feedback and needs change, we’ll be with you to alter and
        optimize your care plan, guide your care and answer your questions.
      </>
    ),
  },
  {
    title:
      "What if I need a cannabis product that’s more potent than the ones that EO provides?",
    content:
      "If you’d like more potent non-EO products to be included in your care plan, just email us at support@eo.care or call 888-823-6143. We’ll do everything we can to accommodate your request.",
  },
];
