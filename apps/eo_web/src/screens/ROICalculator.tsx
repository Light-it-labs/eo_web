import { JotformFrame } from "~/components/JotformFrame";

import { ROI_CALCULATOR_FORM } from "~/configs/env";
import { LayoutDefault } from "~/layouts";

export const ROICalculator = () => {
  return (
    <LayoutDefault >
      <JotformFrame formId={ROI_CALCULATOR_FORM} />
    </LayoutDefault>
  );
};
