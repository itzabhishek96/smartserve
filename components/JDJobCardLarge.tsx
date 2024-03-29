/* eslint-disable camelcase */
import { averagePayPerHour, getSincePostedDate } from "@/utils";
import Image from "next/image";
import React from "react";
import Button from "@/components/Reusable/Button";
import { JobDetails } from "@/types";
import { getLogo } from "@/utils/getLogo";

type Props = {
  data: JobDetails;
};

const JDJobCardLarge = ({
  data: {
    job_title,
    job_city,
    job_posted_at_datetime_utc,
    job_required_experience,
    job_job_title,
    job_employment_type,
    job_description,
    job_highlights,
    employer_name,
    job_apply_link,
    employer_company_type,
    job_min_salary,
    job_max_salary,
    employer_website,
  },
}: Props) => {
  const logo = getLogo(employer_name ?? "");

  const averagePay =
    job_min_salary === undefined || job_max_salary === undefined
      ? 0
      : averagePayPerHour(job_min_salary, job_max_salary);
  return (
    <section className="flex w-full shrink-0 flex-col shadow-1 lg:w-[860px]">
      <div className="relative">
        <div className="h-36 w-full md:h-40 lg:w-[820px]">
          <Image
            src={"/img/widgets/header.png"}
            alt="header"
            fill
            priority
            className="rounded-t-[20px]"
          />
        </div>
        <div className="absolute -bottom-5 left-[40px] flex items-center justify-center rounded-[10px] bg-natural-3 md:-bottom-10">
          <div className="relative m-[3px] h-10 w-10 shrink-0 md:h-16 md:w-16 ">
            <Image
              src={logo}
              alt="logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="p-5 md:p-10">
        <div className="mt-[40px] flex flex-col gap-[30px] md:mt-[72px] md:flex-row md:justify-between">
          <div className="inline-flex flex-col gap-[6px]">
            <div className="flex items-center gap-[20px]">
              <span className="text-base font-semibold not-italic leading-6 text-white md:text-2xl md:font-bold md:leading-8">
                {job_title
                  ? job_title.length > 30
                    ? job_title.slice(0, 30)
                    : job_title
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="text-xs text-slate-400	 font-semibold not-italic leading-4 text-natural-7 md:text-base md:leading-6">
                {employer_name ?? "N/A"}
              </span>
              {job_city !== undefined && (
                <>
                  <span className="h-[3px] w-[3px] text-slate-400 font-semibold rounded-full dark:bg-natural-7 md:bg-[#d8d8d8]" />
                  <span className="text-xs text-slate-400 font-semibold not-italic leading-4 text-natural-7 md:text-base md:leading-6">
                    {job_city}
                  </span>
                </>
              )}
              {job_posted_at_datetime_utc !== undefined && (
                <>
                  <span className="h-[3px] w-[3px] rounded-full dark:bg-natural-7 md:bg-[#d8d8d8]" />
                  <span className="text-xs text-slate-400 font-semibold not-italic leading-4 text-natural-7 md:text-base md:leading-6">
                    {getSincePostedDate(job_posted_at_datetime_utc)}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-[15px] md:justify-end">
          <Button
  href={job_apply_link ?? "/"}
  style="px-4 py-2 md:py-3 bg-green-500 text-white hover:bg-green-600 focus:outline-none rounded-md"
  title="Apply Now"
/>
<Button
  href={`/company/${employer_name?.toLowerCase() ?? "/"}`}
  style="px-4 py-2 md:py-3 border border-green-500 text-green-500 hover:bg-green-100 focus:outline-none rounded-md"
  title="View Company"
/>

          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-lg">
    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Experience:</p>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {job_required_experience?.required_experience_in_months
        ? `${Math.round(job_required_experience.required_experience_in_months / 12)} years`
        : "N/A"}
    </p>
  </div>
  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-lg">
    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Work Level:</p>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{job_job_title ?? "N/A"}</p>
  </div>
  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-lg">
    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Employee Type:</p>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{job_employment_type ?? "N/A"}</p>
  </div>
  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-lg">
    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Offer Salary:</p>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {averagePay ?? averagePay === "0" ? "N/A" : `$${averagePay}`}
    </p>
  </div>
</div>


        {job_description && (
          <div className="mt-8 flex w-full  flex-col items-start gap-[12px]">
            <h2 className="text-base font-bold not-italic leading-6 text-white md:text-lg">
              About The Job
            </h2>

            <p className="line-clamp-[12] text-slate-300 text-sm font-normal not-italic leading-5 text-natural-7 md:line-clamp-6 md:text-base md:leading-6">
              {job_description}
            </p>
          </div>
        )}

        <div className="mt-8 flex w-full flex-col items-start gap-[12px]">
          {job_highlights?.Responsibilities &&
          job_highlights.Responsibilities.length > 0 ? (
            <>
              <h2 className="text-base font-bold not-italic leading-6 text-white md:text-lg">
                Responsibilities
              </h2>

              <div className="line-clamp-3 text-sm text-slate-300 font-normal not-italic leading-5 text-natural-7 md:line-clamp-2 md:text-base md:leading-6">
                <ul className="list-none">
                  {job_highlights.Responsibilities.map((responsibility, i) => (
                    <li key={i} className="flex text-slate-300 gap-2 md:items-start">
                      <div className="mt-1.5 h-2 w-2 text-slate-300 shrink-0 rounded-full border-2 border-primary md:h-2.5 md:w-2.5" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-8 flex w-full flex-col items-start gap-[12px]">
          {job_highlights?.Qualifications &&
          job_highlights.Qualifications.length > 0 ? (
            <>
              <h2 className="text-base font-bold not-italic leading-6 text-white md:text-lg">
                Qualifications
              </h2>

              <div className="line-clamp-3 text-slate-300 text-sm font-normal not-italic leading-5 text-natural-7 md:line-clamp-2 md:text-base md:leading-6">
                <ul className="list-none">
                  {job_highlights.Qualifications.map((qualification, i) => (
                    <li key={i} className="flex gap-2 md:items-start">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-primary md:h-2.5 md:w-2.5" />
                      {qualification}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        <span className="mt-8 h-px w-full bg-natural-2" />
        <h2 className="mt-8 font-bold text-white not-italic leading-6 md:text-lg">
          About The Company
        </h2>

        <div className="mt-5 inline-flex w-full flex-col gap-[14px] md:flex-row md:justify-between">
          <div className="flex gap-[20px]">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src={logo}
                alt="logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="flex flex-col text-slate-300 gap-[2px]">
              <span className="line-clamp-1 text-slate-300 text-base font-semibold not-italic leading-6  dark:text-natural-2 md:text-lg md:font-bold">
                {employer_name ?? "N/A"}
              </span>
              {employer_company_type && (
                <span className="text-sm text-white font-medium not-italic leading-6 text-natural-7 md:text-base">
                  {employer_company_type}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
  <Button
    href={`/company/${employer_name?.toLowerCase() ?? "/"}`}
    style="px-4 py-2 md:py-3 items-center border border-green-500 text-green-500 hover:bg-green-100 focus:outline-none rounded-md"
    title="View Company"
  />
</div>

        </div>
      </div>
    </section>
  );
};

export default JDJobCardLarge;
