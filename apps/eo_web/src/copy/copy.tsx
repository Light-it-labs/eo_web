import { type ElementType, type ReactNode } from "react";

import { icons } from "@eo/ui";





export type CarrouselItem = {
  step: string;
  title: string;
  content: string | ReactNode;
  icon: ElementType;
};

const STEP_1: CarrouselItem = {
  step: "STEP 1",
  title: "Profile & subscribe",
  content:
    "In 5-10 minutes, you can share the key information our clinical team needs to create your initial plan.",
  icon: icons.ProfileIconWhite,
};
const STEP_2: CarrouselItem = {
  step: "STEP 2",
  title: "Get your care plan",
  content:
    "In under 24 hours, you’ll receive an email with a link to your personalized, clinician-approved care plan.",
  icon: icons.HandHeartWhite,
};
const STEP_3: CarrouselItem = {
  step: "STEP 3",
  title: "Get your products",
  content:
    "You’ll order recommended CDB and Delta-9 THC products online for easy home delivery. Typically, there’s no need to visit a dispensary.",
  icon: icons.PillsWhite,
};
const STEP_4: CarrouselItem = {
  step: "STEP 4",
  title: "Provide feedback",
  content:
    "As you use your recommended products per the directions in your care plan, we’ll check in regularly and ask you to complete brief, periodic surveys.",
  icon: icons.FeedBackWhite,
};

const STEP_5: CarrouselItem = {
  step: "STEP 5",
  title: "Get refined plans",
  content:
    "Early on, we’ll provide updated plans every 3-7 days based on your inputs. We’ll then regularly tune your plan for efficacy, safety and affordability.",
  icon: icons.CalendarChecked,
};

const STEP_6: CarrouselItem = {
  step: "ALWAYS",
  title: "Be supported",
  content:
    "You can message our clinical team anytime as needs or questions arise - as often as you like. We’ll respond in under 24 hours - and usually within minutes.",
  icon: icons.SupportIconWhite,
};

export const CancerPilotCarrouselItems: CarrouselItem[] = [
  STEP_1,
  STEP_2,
  {
    ...STEP_3,
    content:
      "You’ll order recommended CDB and Delta-9 THC products online for easy home delivery. Our team will provide details on how to be reimbursed for all purchases.",
  },
  STEP_4,
  STEP_5,
  STEP_6,
];

export const InovaItems: CarrouselItem[] = [
  STEP_1,
  STEP_2,
  {
    ...STEP_3,
    content:
      "You’ll order recommended CDB and Delta-9 THC products online for easy home delivery. Typically, there’s no need to visit a dispensary.",
  },
  STEP_4,
  STEP_5,
  STEP_6,
];

export const CarrouselItems = [STEP_1, STEP_2, STEP_3, STEP_4, STEP_5, STEP_6];

export type Copy = {
  title: string;
  content: string | ReactNode;
};

export const cOrgFaqs: Copy[] = [
  {
    title: "How much does an EO care plan cost?",
    content:
      "As a valued member of our community, your care is completely free. This includes your clinician-reviewed plan, ongoing plan optimization based on your feedback and unlimited phone calls and in-app messaging with our care team. All you pay for are your products.",
  },
  {
    title: "How do I get my products?",
    content: (
      <>
        Recommended CBD and Delta-9 THC products can be ordered through your
        care plan for home delivery. They are delivered just like any other
        package you might receive from the USPS or others.
        <br />
        <br />
        At times, we may recommend products to be picked-up from a dispensary
        near you. For these products, you’ll simply select a time to pick them
        up in your care plan and our team will then order the products for you.
        You just show up at the dispensary at the time you chose, pick-up your
        products and pay for them.
      </>
    ),
  },
  {
    title: "Why am I obtaining my products from multiple retailers?",
    content: (
      <>
        We want to connect you with the most clinically appropriate products
        while also providing the easiest possible experience. In most cases,
        we’ll attempt to address your product needs using CBD and Delta-9 THC
        products available via online retailers (including our own EO Store).
        These products have been shown to be clinically effective, can be
        shipped right to your home and don’t require you to visit a dispensary.
        <br />
        <br />
        However, if the nature and intensity of your symptoms suggest the need
        for products that can only be sourced from a local dispensary, we will
        recommend those products instead.
      </>
    ),
  },
  {
    title:
      "What should I bring with me when I pick-up products at a dispensary?",
    content:
      "Bring your valid medical card (if you have one), a state I.D. or driver’s license and a debit card or enough cash to pay for products.",
  },
  {
    title: "Do I need a medical card to use EO?",
    content:
      "No. You can use EO without a medical card. We’ll ask you about your medical card status when you’re sharing your profile information.",
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
      "Can I use a different dispensary or delivery provider than the one you’ve recommended?",
    content:
      "The answer is an honest “maybe”. If you’d like to make a change just email us at support@eo.care or call 888-823-6143. We’ll do everything we can to accommodate your request.",
  },
  {
    title: "What happens if I run out of a particular product?",
    content:
      "No problem. Just email us at support@eo.care or call 888-823-6143. We’ll update your care plan in the very near term to accommodate the absence of that product if/as appropriate and coordinate the ordering of the needed product or a responsible replacement.",
  },
];

export const pilotFaqs: Copy[] = [
  {
    title: "How much does EO cost?",
    content:
      "Your care is completely free. And we’ll reimburse you for the cost of your products. Just send a picture of your receipt to support@eo.care each time you make a purchase and we’ll provide you with an Amazon gift card in an equal amount.",
  },
  {
    title: "How do I get my products?",
    content: (
      <>
        Recommended CBD and Delta-9 THC products can be ordered through your
        care plan for home delivery. They are delivered just like any other
        package you might receive from the USPS or others.
        <br />
        <br />
        At times, we may recommend products to be picked-up from a dispensary
        near you. For these products, you’ll simply select a time to pick them
        up in your care plan and our team will then order the products for you.
        You just show up at the dispensary at the time you chose, pick-up your
        products and pay for them.
      </>
    ),
  },
  {
    title: "Why am I obtaining my products from multiple retailers?",
    content: (
      <>
        We want to connect you with the most clinically appropriate products
        while also providing the easiest possible experience. In most cases,
        we’ll attempt to address your product needs using CBD and Delta-9 THC
        products available via online retailers (including our own EO Store).
        These products have been shown to be clinically effective, can be
        shipped right to your home and don’t require you to visit a dispensary.
        <br />
        <br />
        However, if the nature and intensity of your symptoms suggest the need
        for products that can only be sourced from a local dispensary, we will
        recommend those products instead.
      </>
    ),
  },
  {
    title:
      "What should I bring with me when I pick-up products at a dispensary?",
    content:
      "Bring your valid medical card (if you have one), a state I.D. or driver’s license and a debit card or enough cash to pay for products.",
  },
  {
    title: "Do I need a medical card to use EO?",
    content:
      "No. You can use EO without a medical card. We’ll ask you about your medical card status when you’re sharing your profile information.",
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
      "Can I use a different dispensary or delivery provider than the one you’ve recommended?",
    content:
      "The answer is an honest “maybe”. If you’d like to make a change just email us at support@eo.care or call 888-823-6143. We’ll do everything we can to accommodate your request.",
  },
  {
    title: "What happens if I run out of a particular product?",
    content:
      "No problem. Just email us at support@eo.care or call 888-823-6143. We’ll update your care plan in the very near term to accommodate the absence of that product if/as appropriate and coordinate the ordering of the needed product or a responsible replacement.",
  },
];

export const inovaFaqs: Copy[] = [
  {
    title: "How much does EO cost?",
    content:
      "Your care is completely free. This includes your clinician-reviewed plan, ongoing plan optimization based on your feedback and unlimited phone calls and in-app messaging with our care team. All you pay for are your products.",
  },
  {
    title: "How do I get my products?",
    content: (
      <>
        Recommended CBD and Delta-9 THC products can be ordered through your
        care plan for home delivery. They are delivered just like any other
        package you might receive from the USPS or others.
        <br />
        <br />
        At times, we may recommend products to be picked-up from a dispensary
        near you. For these products, you’ll simply select a time to pick them
        up in your care plan and our team will then order the products for you.
        You just show up at the dispensary at the time you chose, pick-up your
        products and pay for them.
      </>
    ),
  },
  {
    title: "Why am I obtaining my products from multiple retailers?",
    content: (
      <>
        We want to connect you with the most clinically appropriate products
        while also providing the easiest possible experience. In most cases,
        we’ll attempt to address your product needs using CBD and Delta-9 THC
        products available via online retailers (including our own EO Store).
        These products have been shown to be clinically effective, can be
        shipped right to your home and don’t require you to visit a dispensary.
        <br />
        <br />
        However, if the nature and intensity of your symptoms suggest the need
        for products that can only be sourced from a local dispensary, we will
        recommend those products instead.
      </>
    ),
  },
  {
    title:
      "What should I bring with me when I pick-up products at a dispensary?",
    content:
      "Bring your valid cannabis certification, a state I.D. or driver’s license and a debit card or enough cash to pay for products.",
  },
  {
    title: "What if I don’t have a cannabis certification?",
    content:
      "Depending on your recommended products, you may not need a certification. You only need to be certified if some or all of your recommended products are being sourced from a local dispensary. If you need to be certified, be sure to reach out to support@eo.care for help.",
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
      "Can I use a different dispensary or delivery provider than the one you’ve recommended?",
    content:
      "The answer is an honest “maybe”. If you’d like to make a change just email us at support@eo.care or call 888-823-6143. We’ll do everything we can to accommodate your request.",
  },
  {
    title: "What happens if I run out of a particular product?",
    content:
      "No problem. Just email us at support@eo.care or call 888-823-6143. We’ll update your care plan in the very near term to accommodate the absence of that product if/as appropriate and coordinate the ordering of the needed product or a responsible replacement.",
  },
];

export const paidFaqs: Copy[] = [
  {
    title: "How much does EO cost?",
    content:
      "EO costs $14 per month for your clinician-reviewed plan, ongoing plan optimization based on your feedback and unlimited phone calls and in-app messaging with our care team. You can cancel your subscription any time. Note that the cost of your recommended products is NOT included in your plan unless you’re participating in an EO clinical program.",
  },
  {
    title: "How do I get my products?",
    content: (
      <>
        Recommended CBD and Delta-9 THC products can be ordered through your
        care plan for home delivery. They are delivered just like any other
        package you might receive from the USPS or others.
        <br />
        <br />
        At times, we may recommend products to be picked-up from a dispensary
        near you. For these products, you’ll simply select a time to pick them
        up in your care plan and our team will then order the products for you.
        You just show up at the dispensary at the time you chose, pick-up your
        products and pay for them.
      </>
    ),
  },
  {
    title: "Why am I obtaining my products from multiple retailers?",
    content: (
      <>
        We want to connect you with the most clinically appropriate products
        while also providing the easiest possible experience. In most cases,
        we’ll attempt to address your product needs using CBD and Delta-9 THC
        products available via online retailers (including our own EO Store).
        These products have been shown to be clinically effective, can be
        shipped right to your home and don’t require you to visit a dispensary.
        <br />
        <br />
        However, if the nature and intensity of your symptoms suggest the need
        for products that can only be sourced from a local dispensary, we will
        recommend those products instead.
      </>
    ),
  },
  {
    title:
      "What should I bring with me when I pick-up products at a dispensary?",
    content:
      "Bring your valid medical card (if you have one), a state I.D. or driver’s license and a debit card or enough cash to pay for products.",
  },
  {
    title: "Do I need a medical card to use EO?",
    content:
      "No. You can use EO without a medical card. We’ll ask you about your medical card status when you’re sharing your profile information.",
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
      "Can I use a different dispensary or delivery provider than the one you’ve recommended?",
    content:
      "The answer is an honest “maybe”. If you’d like to make a change just email us at support@eo.care or call 888-823-6143. We’ll do everything we can to accommodate your request.",
  },
  {
    title: "What happens if I run out of a particular product?",
    content:
      "No problem. Just email us at support@eo.care or call 888-823-6143. We’ll update your care plan in the very near term to accommodate the absence of that product if/as appropriate and coordinate the ordering of the needed product or a responsible replacement.",
  },
];
