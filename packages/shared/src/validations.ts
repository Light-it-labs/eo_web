import { isValid, parse } from "date-fns";
import GraphemeSplitter from "grapheme-splitter";
import * as z from "zod";

const colorRegex = /^$|^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const toNumber = (value?: string) => parseFloat(value || "0") || 0;

export const graphemeSplitter = new GraphemeSplitter();

export const countGraphemes = (s?: string) => {
  if (!s) {
    return 0;
  }
  return graphemeSplitter.splitGraphemes(s).length;
};

const dateVal = (isRequired = true) => {
  let schema = z
    .string()
    .trim()
    .regex(
      /^$|([0-9]{2})\/([0-9]{2})\/([0-9]{4})/,
      "Invalid date. Format must be MM/DD/YYYY",
    );

  if (isRequired) {
    schema = schema.min(1);
  }
  return schema.refine((v) => {
    if (!v) {
      return true;
    }

    const parsedDate = parse(v || "", "P", new Date());

    return isValid(parsedDate);
  }, "Date is invalid");
};

export const validations = {
  color: z.string().regex(colorRegex, "Value must be a valid hexadecimal"),
  date: dateVal,
  beforeDate: ({
    date = new Date(),
    req = true,
    msg = "Date must be older",
  }: { date?: Date; req?: boolean; msg?: string } = {}) =>
    dateVal(req).refine((v) => {
      if (!v) {
        return true;
      }
      const parsedDate = parse(v || "", "P", new Date());
      return parsedDate < date;
    }, msg),
  afterDate: ({
    date = new Date(),
    req = true,
    msg = "Date must be newer",
  }: { date?: Date; req?: boolean; msg?: string } = {}) =>
    dateVal(req).refine((v) => {
      if (!v) {
        return true;
      }
      const parsedDate = parse(v || "", "P", new Date());
      return parsedDate > date;
    }, msg),
  strMin: (min: number) =>
    z
      .string()
      .refine(
        (value) => countGraphemes(value) > min,
        `Must be more than ${min} characters`,
      ),
  strMax: (max: number) =>
    z
      .string()
      .refine(
        (value) => countGraphemes(value) < max,
        `Must be less than ${max} characters`,
      ),
  number: ({
    min,
    max,
    msg = "Must be a number",
    minMsg,
    maxMsg,
    req,
    reqMsg = "Field is required",
  }: {
    msg?: string;
    min?: number;
    max?: number;
    minMsg?: string;
    maxMsg?: string;
    req?: boolean;
    reqMsg?: string;
  } = {}) => {
    let val = z
      .string()
      .trim()
      .regex(/^$|^(\-)?[0-9]+((\.)?[0-9]+)?$/, msg);
    if (req) {
      val = val.min(1, reqMsg);
    }

    let refine;
    if (typeof min === "number") {
      refine = val.refine(
        (value) => (!value ? true : toNumber(value) >= min),
        minMsg || `Must be higher than ${min}`,
      );
    }

    if (typeof max === "number") {
      refine = (refine || val).refine(
        (value) => (!value ? true : toNumber(value) <= max),
        maxMsg || `Must be lower than ${max}`,
      );
    }

    return refine || val;
  },
  integer: ({
    min,
    max,
    msg = "Must be a number",
    minMsg,
    maxMsg,
    req,
    reqMsg = "Field is required",
  }: {
    msg?: string;
    min?: number;
    max?: number;
    minMsg?: string;
    maxMsg?: string;
    req?: boolean;
    reqMsg?: string;
  } = {}) => {
    let val = z
      .string()
      .trim()
      .regex(/^[0-9]*$/, msg);
    if (req) {
      val = val.min(1, reqMsg);
    }

    let refine;
    if (typeof min === "number") {
      refine = val.refine(
        (value) => (!value ? true : toNumber(value) >= min),
        minMsg || `Must be higher than ${min}`,
      );
    }

    if (typeof max === "number") {
      refine = (refine || val).refine(
        (value) => (!value ? true : toNumber(value) <= max),
        maxMsg || `Must be lower than ${max}`,
      );
    }

    return refine || val;
  },
  money: ({
    min = 0,
    minMsg,
    req = true,
  }: { min?: number; minMsg?: string; req?: boolean } = {}) => {
    let val = z
      .string()
      .trim()
      .regex(
        /^$|^[0-9]*(\.)?[0-9]{1,2}(0)*?$/,
        "Must be a number, with 2 decimals max",
      );

    if (req) {
      val = val.min(1, "You must specify an amount");
    }

    if (min) {
      const boundMin = Math.max(0, min);
      const msg = minMsg || `Must be greater than ${boundMin}`;
      return val.refine(
        (value) => (!value ? true : toNumber(value) >= boundMin),
        msg,
      );
    }
    return val.refine(
      (value) => (!value ? true : toNumber(value) >= 0),
      `Must be a non-negative amount`,
    );
  },
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
      `Password needs to have at least 8 characters, including at least one number, one lowercase, one uppercase and one special character`,
    ),
};
