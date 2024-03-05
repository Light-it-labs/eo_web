import { LayoutDefault } from "~/layouts";

export const RoiCalculatorThankYou = () => {
  return (
    <LayoutDefault>
      <section className="flex h-full items-center justify-center">
        <div className="flex h-[194px] w-[300px] flex-col justify-center gap-1 rounded-xl border-2 border-black bg-white px-[24px] py-[48px] text-center font-new-hero text-lg font-semibold sm:w-[400px] md:w-[581px] ">
          <div>
            <p>Thank you!</p>
            <p>Your submission has been received!</p>
          </div>
        </div>
      </section>
    </LayoutDefault>
  );
};
