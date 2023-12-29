import { type ReactNode } from "react";

import { icons } from "@eo/ui";





export type Copy = {
  title: string;
  content: string | ReactNode;
};

export const CarrouselItems = [
  {
    step: 1,
    title: "Profile & subscribe",
    content:
      "In 5-10 minutes, you can share the key information our clinical team needs to create your initial plan.",
    icon: icons.ProfileIconWhite,
  },
  {
    step: 2,
    title: "Get your care plan",
    content:
      "In under 24 hours, you’ll receive an email with a link to your personalized, clinician-approved care plan.",
    icon: icons.HandHeartWhite,
  },
  {
    step: 3,
    title: "Get your products",
    content:
      "You can purchase your products at a local dispensary. Our team will provide details on how to get reimbursed.",
    icon: icons.PillsWhite,
  },
  {
    step: 4,
    title: "Provide feedback",
    content:
      "As you sample your recommended products, doses and times of use, we’ll check in via text/email and ask you to complete brief, periodic surveys.",
    icon: icons.FeedBackWhite,
  },
  {
    step: 5,
    title: "Get refined plans",
    content:
      "Early on, we’ll provide updated plans every 3-7 days based on your inputs. We’ll then regularly tune your plan for efficacy, safety and affordability.",
    icon: icons.CalendarChecked,
  },
  {
    step: "ALWAYS",
    title: "Be supported",
    content:
      "You can text our clinical team anytime as needs or questions arise - as often as you like. We’ll respond in under 24 hours and usually within minutes.",
    icon: icons.SupportIconWhite,
  },
];

export const faqs: Copy[] = [
  {
    title: "How much does eo cost?",
    content:
      "Your care is completely free. And we’ll reimburse you for the cost of your products. Just send a picture of your receipt to support@eo.care each time you make a purchase and we’ll provide you with an Amazon gift card in an equal amount.",
  },
  {
    title:
      "Do I order the products that are included in my care plan or do you do it for me?",
    content:
      "After you’ve approved them, we’ll order your products for you and let you know when they’re ready for pick-up - and how much they cost.",
  },
  {
    title: "What should I bring with me when I pick-up my products?",
    content:
      "Bring your valid medical card, a state I.D. or driver’s license and a debit card or enough cash to pay for products.",
  },
  {
    title: "What if I don’t yet have a physical medical card?",
    content:
      "Your care team can provide you with a valid state patient ID number to provide when you purchase and pick-up your products.",
  },
  {
    title:
      "How long should it take my clinical and member services teams to respond to a message, email or phone question/ inquiry?",
    content: "No more than 24 hours and typically within 2-3 hours.",
  },
  {
    title:
      "Why can’t I see my initial care plan as soon as I submit my profile information?",
    content:
      "Every profile submitted and piece of feedback provided is initially assessed by our proprietary data model and a draft care plan or care plan update is created. That plan is then closely reviewed and edited as needed by a licensed eo clinician. This can take as long as 24 hours or this can take as little as an hour, depending on the complexity of your profile, your care plan and clinician availability.",
  },
  {
    title:
      "How do you decide which products, doses and times of use are most right for me?",
    content: (
      <>
        The eo data model and your clinical team base all recommendations on
        relevant aspects of your medical history, cannabis use history, your
        daily schedule and the feedback you provide as you use your care plan.
        <br />
        <br />
        The model and your team also considers the profiles, experiences and
        feedback provided by other eo patients like you and the recommendations
        of our proprietary data model. And your clinical team (of course) always
        draws upon their extensive cannabis treatment and research experience to
        provide the best possible care for you.
      </>
    ),
  },
  {
    title: "What happens if I miss a use session entirely?",
    content: "Just begin the next session as scheduled!",
  },
  {
    title: "What happens if I’m late starting a use session?",
    content:
      "If you’re less than 30 minutes late, go ahead and begin the session (also be sure to begin the next session at the originally scheduled time). If you’re more than 30 minutes late just wait for the next session to begin.",
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
      "Can I use a different dispensary or delivery provider than the one you’ve recommended?",
    content:
      "The answer is an honest “maybe”. If you’d like to make a change just email us at support@eo.care or call 877-707-0706. We’ll do everything we can to accommodate your request.",
  },
  {
    title: "What happens if I run out of a particular product?",
    content:
      "No problem. Just email us at support@eo.care or call 877-707-0706. We’ll update your care plan in the very near term to accommodate the absence of that product if/as appropriate and coordinate the ordering of the needed product or a responsible replacement.",
  },
];
