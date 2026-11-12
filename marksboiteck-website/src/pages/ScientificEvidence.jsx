import React, { useState, useEffect } from "react";
import "../styles/scientific-evidence.css";

export default function ScientificEvidence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    document.title =
      "Scientific Evidence & Key Clinical References | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const papers = [
    {
      title:
        "Accuracy of dental implant placement with or without the use of a dynamic navigation assisted system",
      img: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9d8845f4c60d428d9f4e7_accuracy_of_dental_implants.webp",
      pdf: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9dcc0890b6014396a675d_2023%20Accuracy%20of%20dental%20implant%20placement%20with%20or%20without%20the%20use%20of%20a%20dynamic%20navigation.pdf",
    },
    {
      title: "Intraosseous Anesthesia Using Dynamic Navigation Technology",
      img: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9d6346997c5af24672d00_Intraosseous.webp",
      pdf: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9d530458174694be8661b_2020%20Intraosseous%20Anesthesia%20using%20Dynamic%20Navigation%20Technology.pdf",
    },
    {
      title:
        "Comparative Evaluation of Accuracy of Dynamic Navigation and Free Hand Methods During Zygomatic Implant Placement",
      img: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9dc71890b6014396a2631_comparative.webp",
      pdf: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9dcd4fb58a158393242b8_2024%20Comparative%20Evaluation%20of%20the%20Accuracy%20of%20Dynamic%20Navigation%20and%20Free%20Hand%20Methods.pdf",
    },
  ];

  const clinicalReferences = [
    {
      id: 1,
      text: "Rutkunas V, Gendvilienė I, Auškalnis L, Mangano F, Zlatev S, Ivanova V, Mijiritsky E, Borusevičius R. Influence of Kennedy class and number of implants on the accuracy of dynamic implant navigation: an in vitro study using an x-ray free evaluation methodology. J Dent. 2023 Sep 6:104679. doi: 10.1016/j.jdent.2023.104679. Epub ahead of print. PMID: 37683800.",
      doi: "https://doi.org/10.1016/j.jdent.2023.104679",
      pmid: "37683800",
      category: "implantology",
    },
    {
      id: 2,
      text: "Fujinaka T, Kernitsky J, Liu J, Dibart S. Piezocision Through Computer-Guided Navigation. Int J Periodontics Restorative Dent. 2023 Jul 20. doi: 10.11607/prd.6701. Epub ahead of print. PMID: 37471162.",
      doi: "https://doi.org/10.11607/prd.6701",
      pmid: "37471162",
      category: "implantology",
    },
    {
      id: 3,
      text: "Jorba-García A, Bara-Casaus JJ, Camps-Font O, Sánchez-Garcés MÁ, Figueiredo R, Valmaseda-Castellón E. Accuracy of dental implant placement with or without the use of a dynamic navigation assisted system: A randomized clinical trial. Clin Oral Implants Res. 2023 Feb 16. doi: 10.1111/clr.14050. Epub ahead of print. PMID: 36794798.",
      doi: "https://doi.org/10.1111/clr.14050",
      pmid: "36794798",
      category: "implantology",
    },
    {
      id: 4,
      text: "Wang X, Shujaat S, Meeus J, Shaheen E, Legrand P, Lahoud P, Gerhardt MDN, Jacobs R. Performance of novice versus experienced surgeons for dental implant placement with freehand, static guided and dynamic navigation approaches. Sci Rep. 2023 Feb 14;13(1):2598. doi: 10.1038/s41598-023-29633-6. PMID: 36788333; PMCID: PMC9929278.",
      doi: "https://doi.org/10.1038/s41598-023-29633-6",
      pmid: "36788333",
      category: "implantology",
    },
    {
      id: 5,
      text: "Panithini DB, Sajjan GS, Kinariwala N, Medicharla UD, Varma KM, Kallepalli M. Real-time guided endodontics: A case report of maxillary central incisor with calcific metamorphosis. J Conserv Dent. 2023 Jan-Feb;26(1):113-117. doi: 10.4103/jcd.jcd_506_22. Epub 2022 Dec 8. PMID: 36908734; PMCID: PMC10003280.",
      doi: "https://doi.org/10.4103/jcd.jcd_506_22",
      pmid: "36908734",
      category: "endodontics",
    },
    {
      id: 6,
      text: "Stefanelli, L.V., Mandelaris, G.A. (2023). Dynamic Navigation Systems for the Rehabilitation of the Atrophic Maxillae. In: Rinaldi, M. (eds) Implants and Oral Rehabilitation of the Atrophic Maxilla. Springer, Cham. https://doi.org/10.1007/978-3-031-12755-7_5",
      doi: "https://doi.org/10.1007/978-3-031-12755-7_5",
      category: "atrophic",
    },
    {
      id: 7,
      text: "Böse MWH, Beuer F, Schwitalla A, Bruhnke M, Herklotz I. Dynamic navigation for dental implant placement in single-tooth gaps: A preclinical pilot investigation. J Dent. 2022 Oct;125:104265. doi: 10.1016/j.jdent.2022.104265. Epub 2022 Aug 20. PMID: 35995082.",
      doi: "https://doi.org/10.1016/j.jdent.2022.104265",
      pmid: "35995082",
      category: "implantology",
    },
    {
      id: 8,
      text: "Vasudevan A, Santosh SS, Selvakumar RJ, Sampath DT, Natanasabapathy V. Dynamic Navigation in Guided Endodontics – A Systematic Review. Eur Endod J. 2022 Jun;7(2):81-91. doi: 10.14744/eej.2022.96168. PMID: 35786584; PMCID: PMC9285996.",
      doi: "https://doi.org/10.14744/eej.2022.96168",
      pmid: "35786584",
      category: "endodontics",
    },
    {
      id: 9,
      text: "Golob Deeb J, Kanduti D, Skrjanc L, Carrico CK, Deeb GR. Comparison of accuracy and time for four implant placement techniques supporting fixed-partial denture. J Oral Implantol. 2022 May 3. doi: 10.1563/aaid-joi-D-20-00415. Epub ahead of print. PMID: 35503961.",
      doi: "https://doi.org/10.1563/aaid-joi-D-20-00415",
      pmid: "35503961",
      category: "implantology",
    },
    {
      id: 10,
      text: "Tran D, Deeb J, Wojnarwsky P, Deeb G. Tracking Tag Stabilization with a Small-Diameter Implant in an Edentulous Mandible to Assist Dynamically Navigated Surgery: A case report. J Oral Implantol. 2021 Dec 22. doi: 10.1563/aaid-joi-D-21-00234. Epub ahead of print. PMID: 34937082.",
      doi: "https://doi.org/10.1563/aaid-joi-D-21-00234",
      pmid: "34937082",
      category: "implantology",
    },
    {
      id: 11,
      text: "Jain S, Solanki A. A dynamic surgical navigational approach for immediate implantation and transcrestal sinus augmentation. J Indian Soc Periodontol. 2021 Sep-Oct;25(5):451-456. doi: 10.4103/jisp.jisp_581_20. Epub 2021 Aug 30. PMID: 34667392; PMCID: PMC8452165.",
      doi: "https://doi.org/10.4103/jisp.jisp_581_20",
      pmid: "34667392",
      category: "atrophic",
    },
    {
      id: 12,
      text: "Tawil I. How Dynamic Navigation Can Improve Accuracy and Minimize Errors. Compend Contin Educ Dent. 2021 Sep;42(8):430-435; quiz 436. PMID: 34449239.",
      pmid: "34449239",
      category: "implantology",
    },
    {
      id: 13,
      text: "Torres A, Boelen GJ, Lambrechts P, Pedano MS, Jacobs R. Dynamic navigation: a laboratory study on the accuracy and potential use of guided root canal treatment. Int Endod J. 2021 Sep;54(9):1659-1667. doi: 10.1111/iej.13563. Epub 2021 Jun 12. PMID: 3399112.",
      doi: "https://doi.org/10.1111/iej.13563",
      pmid: "3399112",
      category: "endodontics",
    },
    {
      id: 14,
      text: "Bardales-Alcocer J, Ramírez-Salomón M, Vega-Lizama E, López-Villanueva M, Alvarado-Cárdenas G, Serota KS, Ramírez-Wong J. ENDODONTIC RETREATMENT USING DYNAMIC NAVIGATION: A CASE REPORT. J Endod. 2021 Mar 18:S0099-2399(21)00157-6. doi: 10.1016/j.joen.2021.03.005. Epub ahead of print. PMID: 33745944.",
      doi: "https://doi.org/10.1016/j.joen.2021.03.005",
      pmid: "33745944",
      category: "endodontics",
    },
    {
      id: 15,
      text: "Jorba-García A, González-Barnadas A, Camps-Font O, Figueiredo R, Valmaseda-Castellón E. Accuracy assessment of dynamic computer-aided implant placement: a systematic review and meta-analysis. Clin Oral Investig. 2021 Feb 26. doi: 10.1007/s00784-021-03833-8. Epub ahead of print. PMID: 33635397.",
      doi: "https://doi.org/10.1007/s00784-021-03833-8",
      pmid: "33635397",
      category: "reviews",
    },
    {
      id: 16,
      text: "Wei SM, Zhu Y, Wei JX, Zhang CN, Shi JY, Lai HC. Accuracy of dynamic navigation in implant surgery: A systematic review and meta-analysis. Clin Oral Implants Res. 2021 Apr;32(4):383-393. doi: 10.1111/clr.13719. Epub 2021 Feb 18. PMID: 33540465.",
      doi: "https://doi.org/10.1111/clr.13719",
      pmid: "33540465",
      category: "reviews",
    },
    {
      id: 17,
      text: "Stefanelli LV, Franchina A, Pagliarulo M, Burgess D, Patil S, Bhandi S, Nardo DD, Di Carlo S, Testarelli L, Gambarini G. Management of a Complex Case during COVID-19 Time Using One-day Digital Dentistry: A Case Report. J Contemp Dent Pract 2020; 21 (11):1284-1292.",
      category: "implantology",
    },
    {
      id: 18,
      text: "Schnutenhaus S, Edelmann C, Knipper A, Luthardt RG. Accuracy of Dynamic Computer-Assisted Implant Placement: A Systematic Review and Meta-Analysis of Clinical and In Vitro Studies. J Clin Med. 2021 Feb 11;10(4):704. doi: 10.3390/jcm10040704. PMID: 33670136; PMCID: PMC7916851.",
      doi: "https://doi.org/10.3390/jcm10040704",
      pmid: "33670136",
      category: "reviews",
    },
    {
      id: 19,
      text: "Franchina A, Stefanelli LV, Gorini S, Fedi S, Lizio G, Pellegrino G. Digital Approach for the Rehabilitation of the Edentulous Maxilla with Pterygoid and Standard Implants: The Static and Dynamic Computer-Aided Protocols. Methods Protoc. 2020 Dec 21;3(4):84. doi: 10.3390/mps3040084. PMID: 33371232; PMCID: PMC7768480.",
      doi: "https://doi.org/10.3390/mps3040084",
      pmid: "33371232",
      category: "atrophic",
    },
    {
      id: 20,
      text: "Franchina A, Stefanelli LV, Maltese F, Mandelaris GA, Vantaggiato A, Pagliarulo M, Pranno N, Brauner E, Angelis FD, Carlo SD. Validation of an Intra-Oral Scan Method Versus Cone Beam Computed Tomography Superimposition to Assess the Accuracy between Planned and Achieved Dental Implants: A Randomized In Vitro Study. International Journal of Environmental Research and Public Health. 2020; 17(24):9358.",
      doi: "https://doi.org/10.3390/ijerph17249358",
      category: "implantology",
    },
    {
      id: 21,
      text: "Stefanelli LV, Graziani U, Pranno N, Di Carlo S, Mandelaris GA. Accuracy of Dynamic Navigation Surgery in the Placement of Pterygoid Implants. Int J Periodontics Restorative Dent. 2020 Nov/Dec;40(6):825-834. doi: 10.11607/prd.4605. PMID: 33151187.",
      doi: "https://doi.org/10.11607/prd.4605",
      pmid: "33151187",
      category: "atrophic",
    },
    {
      id: 22,
      text: "Scheyer ET, Mandelaris GA, McGuire MK, AlTakriti MA, Stefanelli LV. Implant Placement Under Dynamic Navigation Using Trace Registration: Case Presentations. Int J Periodontics Restorative Dent. 2020 Nov/Dec;40(6):e241-e248. doi: 10.11607/prd.4479. PMID: 33151199.",
      doi: "https://doi.org/10.11607/prd.4479",
      pmid: "33151199",
      category: "implantology",
    },
    {
      id: 23,
      text: "Stefanelli, L.V., Pranno, N., De Angelis, F. et al. Navigated Antral Bone Expansion (NABE): a prospective study on 35 patients with 4 months of follow-up post implant loading. BMC Oral Health 20, 273 (2020). https://doi.org/10.1186/s12903-020-01268-3",
      doi: "https://doi.org/10.1186/s12903-020-01268-3",
      category: "atrophic",
    },
    {
      id: 24,
      text: "Jain SD, Carrico CK, Bermanis I, Rehil S. Intraosseous Anesthesia using Dynamic Navigation Technology. [published online ahead of print, 2020 Sept 10]. J Endod. 2020; doi.org/10.1016/j.joen.2020.09.001",
      doi: "https://doi.org/10.1016/j.joen.2020.09.001",
      category: "endodontics",
    },
    {
      id: 25,
      text: "Jain SD, Saunders MW, Carrico CK, Jadhav A, Deeb JG, Myers GL. Dynamically Navigated versus Freehand Access Cavity Preparation: A Comparative Study on Substance Loss Using Simulated Calcified Canals. J Endod. 2020 Aug 11:S0099-2399(20)30578-1. doi: 10.1016/j.joen.2020.07.032. Epub ahead of print. PMID: 32795551.",
      doi: "https://doi.org/10.1016/j.joen.2020.07.032",
      pmid: "32795551",
      category: "endodontics",
    },
    {
      id: 26,
      text: "Deeb JG, Frantar A, Deeb GR, Carrico CK, Rener-Sitar K. In Vitro Comparison of Time and Accuracy of Implant Placement Using Trephine and Conventional Drilling Techniques Under Dynamic Navigation [published online ahead of print, 2020 Aug 11]. J Oral Implantol. 2020;10.1563/aaid-joi-D-19-00125. doi:10.1563/aaid-joi-D-19-00125",
      doi: "https://doi.org/10.1563/aaid-joi-D-19-00125",
      category: "implantology",
    },
    {
      id: 27,
      text: "Stefanelli, L.V.; Mandelaris, G.A.; Franchina, A.; Pranno, N.; Pagliarulo, M.; Cera, F.; Maltese, F.; Angelis, F.D.; Carlo, S.D. Accuracy of Dynamic Navigation System Workflow for Implant Supported Full Arch Prosthesis: A Case Series. Int. J. Environ. Res. Public Health 2020, 17, 5038.",
      doi: "https://doi.org/10.3390/ijerph17145038",
      category: "implantology",
    },
    {
      id: 28,
      text: "Deeb GR, Tran DQ, Deeb JG. Computer-Aided Planning and Placement in Implant Surgery. Atlas Oral Maxillofac Surg Clin North Am. 2020;28(2):53-58. doi:10.1016/j.cxom.2020.05.001",
      doi: "https://doi.org/10.1016/j.cxom.2020.05.001",
      category: "implantology",
    },
    {
      id: 29,
      text: "Stefanelli LV, Mandelaris GA, Franchina A, et al. Accuracy Evaluation of 14 Maxillary Full Arch Implant Treatments Performed with Da Vinci Bridge: A Case Series. Materials (Basel). 2020;13(12):E2806. Published 2020 Jun 22. doi:10.3390/ma13122806",
      doi: "https://doi.org/10.3390/ma13122806",
      category: "atrophic",
    },
    {
      id: 30,
      text: "Gambarini G, Galli M, Morese A, et al. Precision of dynamic navigation to perform endodontic ultraconservative access cavities: a preliminary in vitro analysis [published online ahead of print, 2020 Jun 15]. J Endod. 2020;S0099-2399(20)30385-X. doi:10.1016/j.joen.2020.05.022",
      doi: "https://doi.org/10.1016/j.joen.2020.05.022",
      category: "endodontics",
    },
    {
      id: 31,
      text: "Gambarini G, Galli M, Morese A, Abduljabbar F, Seracchiani M, Stefanelli LV, Giovarruscio M, Di Nardo D, Testarelli L. Digital Design of Minimally Invasive Endodontic Access Cavity. Appl. Sci. 2020, 10, 3513.",
      doi: "https://doi.org/10.3390/app10103513",
      category: "endodontics",
    },
    {
      id: 32,
      text: "Jain SD, Carrico CK, Bermanis I. 3-Dimensional Accuracy of Dynamic Navigation Technology in Locating Calcified Canals. J Endod. 2020;46(6):839-845. doi:10.1016/j.joen.2020.03.014",
      doi: "https://doi.org/10.1016/j.joen.2020.03.014",
      category: "endodontics",
    },
    {
      id: 33,
      text: "Stefanelli LV, Mandelaris GA, DeGroot BS, Gambarini G, De Angelis F, Di Carlo S. Accuracy of a Novel Trace-Registration Method for Dynamic Navigation Surgery. Int J Periodontics Restorative Dent. 2020 May/Jun;40(3):427-435. doi: 10.11607/prd.4420. PubMed PMID: 32233198.",
      doi: "https://doi.org/10.11607/prd.4420",
      pmid: "32233198",
      category: "implantology",
    },
    {
      id: 34,
      text: "Chen YT, Chiu YW, Peng CY. Preservation of Inferior Alveolar Nerve Using the Dynamic Dental Implant Navigation System. J Oral Maxillofac Surg. 2020 Jan 22. pii: S0278-2391(20)30022-7. doi: 10.1016/j.joms.2020.01.007. [Epub ahead of print] PubMed PMID: 32061618.",
      doi: "https://doi.org/10.1016/j.joms.2020.01.007",
      pmid: "32061618",
      category: "implantology",
    },
    {
      id: 35,
      text: "Aydemir CA, Arisan V. Accuracy of dental implant placement via dynamic navigation or the freehand method: A split-mouth randomized controlled clinical trial. Clin Oral Implants Res. 2020;31(3):255‐263. doi:10.1111/clr.13563",
      doi: "https://doi.org/10.1111/clr.13563",
      category: "implantology",
    },
    {
      id: 36,
      text: "Zubizarreta-Macho Á, Muñoz AP, Deglow ER, Agustín-Panadero R, Álvarez JM. Accuracy of Computer-Aided Dynamic Navigation Compared to Computer-Aided Static Procedure for Endodontic Access Cavities: An in Vitro Study. J Clin Med. 2020 Jan 2;9(1). pii: E129. doi: 10.3390/jcm9010129. PubMed PMID: 31906598; PubMed Central PMCID: PMC7019931.",
      doi: "https://doi.org/10.3390/jcm9010129",
      pmid: "31906598",
      category: "endodontics",
    },
    {
      id: 37,
      text: "Mediavilla Guzmán A, Riad Deglow E, Zubizarreta-Macho Á, Agustín-Panadero R, Hernández Montero S. Accuracy of Computer-Aided Dynamic Navigation Compared to Computer-Aided Static Navigation for Dental Implant Placement: An In Vitro Study. J Clin Med. 2019 Dec 2;8(12). pii: E2123. doi: 10.3390/jcm8122123. PubMed PMID: 31810351; PubMed Central PMCID: PMC6947513.",
      doi: "https://doi.org/10.3390/jcm8122123",
      pmid: "31810351",
      category: "implantology",
    },
    {
      id: 38,
      text: "Chen JT. A Novel Application of Dynamic Navigation System in Socket Shield Technique. J Oral Implantol. 2019 Oct;45(5):409-415. doi:10.1563/aaid-joi-D-19-00072. Epub 2019 Aug 7. PubMed PMID: 31389753",
      doi: "https://doi.org/10.1563/aaid-joi-D-19-00072",
      pmid: "31389753",
      category: "implantology",
    },
    {
      id: 39,
      text: "Gambarini G, Galli M, Stefanelli LV, Di Nardo D, Morese A, Seracchiani M, De Angelis F, Di Carlo S, Testarelli L. Endodontic Microsurgery Using Dynamic Navigation System: A Case Report. DOI: https://doi.org/10.1016/j.joen.2019.07.010",
      doi: "https://doi.org/10.1016/j.joen.2019.07.010",
      category: "endodontics",
    },
    {
      id: 40,
      text: "Golob Deeb J, Bencharit S, Carrico CK, Lukic M, Hawkins D, Rener-Sitar K, Deeb GR. Exploring training dental implant placement using computer-guided implant navigation system for predoctoral students: a pilot study. Eur J Dent Educ. 2019 May 29. doi: 10.1111/eje.12447. [Epub ahead of print] PubMed PMID: 31141291.",
      doi: "https://doi.org/10.1111/eje.12447",
      pmid: "31141291",
      category: "implantology",
    },
    {
      id: 41,
      text: "Chong BS, Dhesi M, Makdissi J. Computer-aided dynamic navigation: a novel method for guided endodontics. Quintessence Int. 2019;50(3):196-202. doi: 10.3290/j.qi.a41921. PubMed PMID: 30773571.",
      doi: "https://doi.org/10.3290/j.qi.a41921",
      pmid: "30773571",
      category: "endodontics",
    },
    {
      id: 42,
      text: "Stefanelli LV, DeGroot BS, Lipton DI, Mandelaris GA. Accuracy of a Dynamic Dental Implant Navigation System in a Private Practice. Int J Oral Maxillofac Implants. 2019 January/February;34(1):205–213. doi: 10.11607/jomi.6966. Epub 2018 Dec 5. PubMed PMID: 30521660.",
      doi: "https://doi.org/10.11607/jomi.6966",
      pmid: "30521660",
      category: "implantology",
    },
    {
      id: 43,
      text: "Jorba-García A, Figueiredo R, González-Barnadas A, Camps-Font O, Valmaseda-Castellón E. Accuracy and the role of experience in dynamic computer guided dental implant surgery: An in-vitro study. Med Oral Patol Oral Cir Bucal. 2019 Jan 1;24(1):e76-e83. doi: 10.4317/medoral.22785. PubMed PMID: 30573712; PubMed Central PMCID: PMC6344002.",
      doi: "https://doi.org/10.4317/medoral.22785",
      pmid: "30573712",
      category: "implantology",
    },
    {
      id: 44,
      text: "Mandelaris GA, Stefanelli LV, DeGroot BS. Dynamic Navigation for Surgical Implant Placement: Overview of Technology, Key Concepts, and a Case Report. Compend Contin Educ Dent. 2018 Oct;39(9):614-621; quiz 622. Review. PubMed PMID: 30299111.",
      pmid: "30299111",
      category: "reviews",
    },
    {
      id: 45,
      text: "Taniguchi Y, Tsuzuki T, Kakura K, Yoneda M, Isshi K, et al. (2018) Research Concerning Abutment Placement Training using a Navigation System. Dentistry 8: 517. doi:10.4172/2161-1122.1000517.",
      doi: "https://doi.org/10.4172/2161-1122.1000517",
      category: "implantology",
    },
    {
      id: 46,
      text: "Jokstad A, Winnett B, Fava J, Powell D, Somogyi-Ganss E. Investigational Clinical Trial of a Prototype Optoelectronic Computer-Aided Navigation Device for Dental Implant Surgery. Int J Oral Maxillofac Implants. 2018 May/Jun;33(3):679-692. doi: 10.11607/jomi.6351. PubMed PMID: 29763504.",
      doi: "https://doi.org/10.11607/jomi.6351",
      pmid: "29763504",
      category: "implantology",
    },
    {
      id: 47,
      text: "D'haese J, Ackhurst J, Wismeijer D, De Bruyn H, Tahmaseb A. Current state of the art of computer-guided implant surgery. Periodontol 2000. 2017 Feb;73(1):121-133. doi: 10.1111/prd.12175. Review. PubMed PMID: 28000275.",
      doi: "https://doi.org/10.1111/prd.12175",
      pmid: "28000275",
      category: "reviews",
    },
    {
      id: 48,
      text: "Somogyi-Ganss E, Holmes HI, Jokstad A. Accuracy of a novel prototype dynamic computer-assisted surgery system. Clin Oral Implants Res. 2015 Aug;26(8):882-890. doi: 10.1111/clr.12414. Epub 2014 May 19. PubMed PMID: 24837492.",
      doi: "https://doi.org/10.1111/clr.12414",
      pmid: "24837492",
      category: "implantology",
    },
  ];

  const handleCopyCitation = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredReferences = clinicalReferences.filter((ref) => {
    const matchesSearch =
      ref.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ref.pmid && ref.pmid.includes(searchQuery)) ||
      ref.id.toString() === searchQuery.trim();

    const matchesCategory =
      selectedCategory === "all" || ref.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="scientific-page-wrapper scientific-page-main">
      {/* 1. TOP HERO BANNER */}
      <section className="top-banner-careers">
        <div>
          <span className="top-banner-badge">
            CLINICAL VALIDATION &amp; PEER-REVIEWED RESEARCH
          </span>
          <h1>Transform Your Dental Practice Today</h1>
        </div>
      </section>

      {/* 2. STATS OVERVIEW STRIP */}
      <div className="sci-stats-strip">
        <div className="sci-stats-grid">
          <div className="sci-stat-item">
            <span className="sci-stat-num">48+</span>
            <span className="sci-stat-label">Peer-Reviewed Publications</span>
          </div>
          <div className="sci-stat-item">
            <span className="sci-stat-num">&lt; 0.5 mm</span>
            <span className="sci-stat-label">Sub-Millimeter Navigation Accuracy</span>
          </div>
          <div className="sci-stat-item">
            <span className="sci-stat-num">10+</span>
            <span className="sci-stat-label">Global University Trials</span>
          </div>
          <div className="sci-stat-item">
            <span className="sci-stat-num">100%</span>
            <span className="sci-stat-label">Digital Restorative Predictability</span>
          </div>
        </div>
      </div>

      {/* 3. SCIENTIFIC EVIDENCE CONTENT */}
      <section id="faqs" className="light-section">
        <div className="w-layout-blockcontainer regulatory-container w-container">
          <div className="sci-header-block">
            <h2 className="heading-3">Scientific Evidence</h2>
            <div className="faq-text faq-text-subtitle">
              Read about how Navident and MicronMapper are advancing dentistry science.
            </div>
          </div>

          {/* Featured Clinical Papers Grid */}
          <h3 className="featured-papers-heading">Featured Clinical Investigations</h3>
          <div className="div-block-27">
            {papers.map((paper, idx) => (
              <a
                key={idx}
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="evidence-link w-inline-block"
                title={`Download and read: ${paper.title}`}
              >
                <div className="evidence-image-wrap">
                  <img
                    src={paper.img}
                    loading="lazy"
                    alt={paper.title}
                    className="evidence-image"
                  />
                </div>
                <div className="evidence-paper-tag">
                  <i className="fa-solid fa-file-lines"></i> Research Publication
                </div>
                <div className="evidence-text">{paper.title}</div>
                <div className="evidence-pdf-cta">
                  <i className="fa-solid fa-file-pdf"></i> Read Paper (PDF)
                </div>
              </a>
            ))}
          </div>

          {/* Key Clinical References Repository (48 References) */}
          <div className="faq-text references-repository-box">
            <div className="references-top-header">
              <div className="references-title-row">
                <h4 className="references-heading">
                  <i className="fa-solid fa-book-bookmark"></i> Key Clinical References:
                </h4>
                <div className="references-count-badge">
                  {filteredReferences.length} of {clinicalReferences.length} Studies
                </div>
              </div>

              {/* Live Search Filter */}
              <div className="ref-search-wrap">
                <i className="fa-solid fa-magnifying-glass ref-search-icon"></i>
                <input
                  type="text"
                  className="ref-search-input"
                  placeholder="Search by author, year, technique (e.g., Rutkunas, Zygoma, Endodontics)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search clinical references"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="ref-filter-tags">
                <button
                  type="button"
                  className={`ref-filter-btn ${
                    selectedCategory === "all" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Studies ({clinicalReferences.length})
                </button>
                <button
                  type="button"
                  className={`ref-filter-btn ${
                    selectedCategory === "implantology" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("implantology")}
                >
                  Dynamic Implant Navigation
                </button>
                <button
                  type="button"
                  className={`ref-filter-btn ${
                    selectedCategory === "endodontics" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("endodontics")}
                >
                  Guided Endodontics
                </button>
                <button
                  type="button"
                  className={`ref-filter-btn ${
                    selectedCategory === "atrophic" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("atrophic")}
                >
                  Zygoma &amp; Atrophic Maxilla
                </button>
                <button
                  type="button"
                  className={`ref-filter-btn ${
                    selectedCategory === "reviews" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("reviews")}
                >
                  Systematic Reviews &amp; Meta-Analyses
                </button>
              </div>
            </div>

            {/* List of References */}
            {filteredReferences.length > 0 ? (
              <div className="references-list-grid">
                {filteredReferences.map((ref) => (
                  <div key={ref.id} className="reference-card-item">
                    <div className="ref-num-badge">
                      {ref.id < 10 ? `0${ref.id}` : ref.id}
                    </div>
                    <div className="ref-content-wrap">
                      <p className="ref-citation-text">{ref.text}</p>
                      <div className="ref-links-row">
                        {ref.doi && (
                          <a
                            href={ref.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ref-meta-link"
                            title="Open DOI Publication"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square"></i> DOI Link
                          </a>
                        )}
                        {ref.pmid && (
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ref-meta-link"
                            title={`View on PubMed (PMID: ${ref.pmid})`}
                          >
                            <i className="fa-solid fa-dna"></i> PubMed ({ref.pmid})
                          </a>
                        )}
                        <button
                          type="button"
                          className="ref-copy-btn"
                          onClick={() => handleCopyCitation(ref.id, ref.text)}
                          title="Copy citation to clipboard"
                        >
                          {copiedId === ref.id ? (
                            <>
                              <i className="fa-solid fa-check" style={{ color: "#22c55e" }}></i> Copied!
                            </>
                          ) : (
                            <>
                              <i className="fa-regular fa-copy"></i> Copy Citation
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ref-empty-state">
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ fontSize: "28px", color: "#ce2017", marginBottom: "12px", display: "block" }}
                ></i>
                No publications found matching &ldquo;{searchQuery}&rdquo;. Try another author, term, or clear the search.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
