import { FormatBulletPoints } from "./utils";

export const chicagoDescription =
  "The Windy City, Chicago is known for its Midwestern attitude, bustling downtown, and variable climate.";
export const chicagoBullets = FormatBulletPoints([
  "Sean's House",
  "Saint Alphonsus Academy",
  "Chicago Warriors Baseball Club",
  "Rowan Labs",
  "Focus Healthcare Partners",
]);

export const seansHouseDescription =
  "Sean owes everything to his family, and has a lot of fond memories growing up in the city.";
export const saintAlphonsusAcademyDescription =
  "Sean coaches 12u boys basketball for the Alphonsus Academy Rockets, and boasts an undefeated record in Chicago Catholic League play.";
export const chicagoWarriorsBaseballClubDescription =
  "Sean coaches 17u boys baseball for the Chicago Warriors, and spends his weekends travelling the Midwest for tourney play.";
export const rowanLabsDescription =
  "Sean works for Rowan as an M&A Product Engineer, helping transform unsellable industrial small businesses into attractive M&A targets.";
export const focusHealthcarePartnersDescription =
  "Sean discoverd a love for M&A while being a private equity analyst in lower middle market healthcare, running two full deals.";

export const notreDameDescription =
  "Home of Touchdown Jesus and the Fighting Irish, this college town holds a lot of hopes and dreams.";
export const notreDameBullets = FormatBulletPoints([
  "Duncan Hall",
  "ND Listens",
  "Golden Dome",
  "The Grotto",
  "ND Careers Course",
]);

export const duncanHallDescription =
  "Sean served as a Resident Assistant in Duncan Hall alongisde lifelong Highlander brothers in Community, Brotherhood, and Respect.";
export const ndListensDescription =
  "Sean worked as a Data Engineer and Student Caller for Alumni Relations, always listening to, learning about, and loving the ND family.";
export const goldenDomeDescription =
  "Sean studied Computer Engineering, Finance, and Accounting while an undergraduate, graduating with Latin honors.";
export const grottoDescription =
  "Sean spent nearly every remotely sunny evening between the Grotto and the Lakes, taking in those good old Midwestern sunsets.";
export const ndCareersCourseDescription =
  "Sean submitted a research proposal and ran the introductory course for Careers in Computer Science and Engineering, helping aspiring professionals.";

export const fierySpiritDescription =
  "Two-tier volcanic unrest system that pairs satellite imagery with TinyML seismic models on the edge.";
export const fierySpiritBullets = FormatBulletPoints([
  "https://fiery-spirit.earth",
  "https://github.com/sfroning88/fiery-spirit",
]);

export const fierySpiritMotivationsDescription =
  "Volcanic monitoring is expensive in remote or inhospitable regions; can TinyML improve monitoring capabilities and protect rural citizens?";
export const fierySpiritDeformationDescription =
  "The first signal of interest is ground deformation (changes in the shape of the volcano or surrounding landscape) due to subterranean magma flows.";
export const fierySpiritSeismicDescription =
  "The second signal of interest is seismic activity (measurable by on-ground seismic sensors) enabling experts to infer underlying magma movement across a given area of land.";
export const fierySpiritInterferogramsDescription =
  "Interferometric Synthetic Aperture Radar (InSAR) is a leading technique to detect deformation over broad areas of land by aggregating multiple radar images of the same location.";
export const fierySpiritWaveformsDescription =
  "Sensors product spectrograms capturing four distinct classes of seismic activity in volcano regions: volcanic tectonic (VT), long period (LP), tremor (TR), and tectonic (TC).";
export const fierySpiritScreenerDescription =
  "Fine-tune 'Screener' cloud ViT with qkv-only LoRA and AdamW on interferograms for detecting ground-deformation.";
export const fierySpiritTeacherDescription =
  "Pre-train 'Teacher' cloud CNN with for 4-class labelling of seismic waveforms for detecting volcanic tremors.";
export const fierySpiritStudentDescription =
  "Distill and compress 'Student' with iterative prune-then-finetune and PTQ/QAT quantization under flash/peak RAM/MAC budgets.";
export const fierySpiritDashboardDescription =
  "Detect volcanic unrest by cross-correlating inferences from satellite imagery with on-ground sensor readings.";
