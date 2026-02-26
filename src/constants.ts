export interface Diamond {
  id: string;
  name: string;
  price: number;
  carat: number;
  clarity: string;
  color: string;
  cut: string;
  image: string;
  gallery: string[];
  description: string;
}

export const DIAMONDS: Diamond[] = [
  {
    id: "radiant-solitaire",
    name: "The Radiant Solitaire",
    price: 24500,
    carat: 3.24,
    clarity: "VVS1",
    color: "D (Colorless)",
    cut: "Excellent",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPYAj_qbT7pCcpHQ19wuT4utnUHjslDGhNAxbudgtQpYH7-NIcCCqYXog0q0TZUX7VBZJ-M1cOtTZZznYgbCrCHGJygSQa3eh588eboTyJrdcUH5PpA5BAaVExj4_H1yQh_J7EoyJiaAH8298aG6VhEXNOzgsqimmB0zuGwFhksPA-GAJlaGBTWPUycXgIbQme0STG5Dw3Vl1xZ3r8jME5q_zlcCc-ReTiDEcNGORSeLM9mUuWLIbvWbQD_OmxIfoR5kDt_1STisU",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPYAj_qbT7pCcpHQ19wuT4utnUHjslDGhNAxbudgtQpYH7-NIcCCqYXog0q0TZUX7VBZJ-M1cOtTZZznYgbCrCHGJygSQa3eh588eboTyJrdcUH5PpA5BAaVExj4_H1yQh_J7EoyJiaAH8298aG6VhEXNOzgsqimmB0zuGwFhksPA-GAJlaGBTWPUycXgIbQme0STG5Dw3Vl1xZ3r8jME5q_zlcCc-ReTiDEcNGORSeLM9mUuWLIbvWbQD_OmxIfoR5kDt_1STisU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeYLgjLMCM_iFnagOEWhbYSo8CB8XCf3NfYymy564wNLbcpO8h11V2bcGkfXKK8-1JxitwTw1badIugPhnxl7HqOVzzAokl1L9IGNO3xnGsrBBKOCIOOWemjEhf6WEHDKBx61qyNB2IxiTnj1BvDzR09FySjV1aArFacjyU9MLIZDOKz8GkL6r6xkYyO9R9aAFMKWd1ijyyoixYD-QRveaEK5w22bDmxRwHkMk2lEaftonp6nURiebMX7GtcvRrqwDxGOpzoeXP_4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyr4U3YthNJ0VfTlWjTebG1Bwqi52w2PnGj6GTCNL5xdAAIqOrNG_Tp9v0Bh7LMbV9jRJzkWl5-yD6e0fpaHEKfLtUW_WOrh4K6x4s2Hat62A9JBGUR6GhvTb9sd7VWmYs8GHKYAXYDwvkf2RxFgFA5MvSQjzsTrEjtplyMyX1JYR8AcJEiFDdMObQqy1N7SmXtv8AWsbN2WLMS9sNdHUaCdKIA_QMvMgtcDehf9eL2sv2KjYVkjx0bGCv2nTSx7Yyf8zrIULitw0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgs4cSvmPk9fDlPyQ3W2SjWzJYVLRgc_42g4Ui2IshBoTHxyC25fTPUX8K3rGYJwQk7ZLCjoNhnaBrmsLAouPkWz7i0AFl-eh7K0qnGSzjSO5R-9CwldadG_t9g4s4uUee1bXfYxF8F4h7jWa_mKvWp0VFachAljfbY6g5fqVYA21mM43NpiWlgn5PoZC6PiwyetElIkasZSSGHvqvkmVPm-Qx-FEyo9-DXP1bUNZtwyf8XUNOEER8vP3hay0oWGwzZRuFAveCA"
    ],
    description: "A classic silhouette reimagined with modern precision. This radiant-cut masterpiece reflects a lifetime of brilliance."
  },
  {
    id: "pear-cut",
    name: "The Pear Cut",
    price: 18200,
    carat: 2.5,
    clarity: "VS1",
    color: "E",
    cut: "Excellent",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArCsOcqOLTr7XgYIUp5KVtf7YfYIlDahaNCOdfUXHQRb7rF1_Efst1-8bxu5Iz2zXeVmvmKuOKFYAurf4bBv108LfX2HjwNULA-yBw3RZLhxmU34MSdietcKZQOZAIDgiFD19qumVW3M7YfrYXzJHEEOuKpnQsqCzGOhb4aDaRwMUKT3ImgcsegUFNo6vSj0IvHlzVJX_tFwSvIGFNP2lh4OPlrelAAfqJovYvjbYI9YvH6AffHYcinPWVWJZ5gLD7InjcXm3RtxA",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArCsOcqOLTr7XgYIUp5KVtf7YfYIlDahaNCOdfUXHQRb7rF1_Efst1-8bxu5Iz2zXeVmvmKuOKFYAurf4bBv108LfX2HjwNULA-yBw3RZLhxmU34MSdietcKZQOZAIDgiFD19qumVW3M7YfrYXzJHEEOuKpnQsqCzGOhb4aDaRwMUKT3ImgcsegUFNo6vSj0IvHlzVJX_tFwSvIGFNP2lh4OPlrelAAfqJovYvjbYI9YvH6AffHYcinPWVWJZ5gLD7InjcXm3RtxA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Uekide9u4jfbhtqOHkIPrAhRnCNIEPAavppYiwwkhG2-0HAF7Oj5rP-ZpU-UC4utuygBZ9NgFqH6M6WI3bD4foDBszI_prReBzYel_t0LFdnAUsITd3nrb4zuM9wCUHlNlUIq4eA8XlQ1n5vXYx2UdUWpY8-qDIJxyfSWs0b-4CNwgTk4FHEA-xvMsH2v1GcHIV1Vyoh-IZttL7adqwEpHNkThD0utqBLn8o-qE-etAYPNONKRdT-49i8v4ZnZqwGj5IeTvzLgY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeYLgjLMCM_iFnagOEWhbYSo8CB8XCf3NfYymy564wNLbcpO8h11V2bcGkfXKK8-1JxitwTw1badIugPhnxl7HqOVzzAokl1L9IGNO3xnGsrBBKOCIOOWemjEhf6WEHDKBx61qyNB2IxiTnj1BvDzR09FySjV1aArFacjyU9MLIZDOKz8GkL6r6xkYyO9R9aAFMKWd1ijyyoixYD-QRveaEK5w22bDmxRwHkMk2lEaftonp6nURiebMX7GtcvRrqwDxGOpzoeXP_4"
    ],
    description: "A rare selection of pear-cut diamonds, chosen for their exceptional fire and soul."
  },
  {
    id: "cushion-cut",
    name: "The Cushion Cut",
    price: 21000,
    carat: 2.8,
    clarity: "VVS2",
    color: "F",
    cut: "Excellent",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Uekide9u4jfbhtqOHkIPrAhRnCNIEPAavppYiwwkhG2-0HAF7Oj5rP-ZpU-UC4utuygBZ9NgFqH6M6WI3bD4foDBszI_prReBzYel_t0LFdnAUsITd3nrb4zuM9wCUHlNlUIq4eA8XlQ1n5vXYx2UdUWpY8-qDIJxyfSWs0b-4CNwgTk4FHEA-xvMsH2v1GcHIV1Vyoh-IZttL7adqwEpHNkThD0utqBLn8o-qE-etAYPNONKRdT-49i8v4ZnZqwGj5IeTvzLgY",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Uekide9u4jfbhtqOHkIPrAhRnCNIEPAavppYiwwkhG2-0HAF7Oj5rP-ZpU-UC4utuygBZ9NgFqH6M6WI3bD4foDBszI_prReBzYel_t0LFdnAUsITd3nrb4zuM9wCUHlNlUIq4eA8XlQ1n5vXYx2UdUWpY8-qDIJxyfSWs0b-4CNwgTk4FHEA-xvMsH2v1GcHIV1Vyoh-IZttL7adqwEpHNkThD0utqBLn8o-qE-etAYPNONKRdT-49i8v4ZnZqwGj5IeTvzLgY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgs4cSvmPk9fDlPyQ3W2SjWzJYVLRgc_42g4Ui2IshBoTHxyC25fTPUX8K3rGYJwQk7ZLCjoNhnaBrmsLAouPkWz7i0AFl-eh7K0qnGSzjSO5R-9CwldadG_t9g4s4uUee1bXfYxF8F4h7jWa_mKvWp0VFachAljfbY6g5fqVYA21mM43NpiWlgn5PoZC6PiwyetElIkasZSSGHvqvkmVPm-Qx-FEyo9-DXP1bUNZtwyf8XUNOEER8vP3hay0oWGwzZRuFAveCA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyr4U3YthNJ0VfTlWjTebG1Bwqi52w2PnGj6GTCNL5xdAAIqOrNG_Tp9v0Bh7LMbV9jRJzkWl5-yD6e0fpaHEKfLtUW_WOrh4K6x4s2Hat62A9JBGUR6GhvTb9sd7VWmYs8GHKYAXYDwvkf2RxFgFA5MvSQjzsTrEjtplyMyX1JYR8AcJEiFDdMObQqy1N7SmXtv8AWsbN2WLMS9sNdHUaCdKIA_QMvMgtcDehf9eL2sv2KjYVkjx0bGCv2nTSx7Yyf8zrIULitw0"
    ],
    description: "Signature series cushion-cut diamonds, offering a soft yet brilliant sparkle."
  }
];

export const IMAGES = {
  HERALDIC_SEAL: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyr4U3YthNJ0VfTlWjTebG1Bwqi52w2PnGj6GTCNL5xdAAIqOrNG_Tp9v0Bh7LMbV9jRJzkWl5-yD6e0fpaHEKfLtUW_WOrh4K6x4s2Hat62A9JBGUR6GhvTb9sd7VWmYs8GHKYAXYDwvkf2RxFgFA5MvSQjzsTrEjtplyMyX1JYR8AcJEiFDdMObQqy1N7SmXtv8AWsbN2WLMS9sNdHUaCdKIA_QMvMgtcDehf9eL2sv2KjYVkjx0bGCv2nTSx7Yyf8zrIULitw0",
  RAW_GEM_HERO: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeYLgjLMCM_iFnagOEWhbYSo8CB8XCf3NfYymy564wNLbcpO8h11V2bcGkfXKK8-1JxitwTw1badIugPhnxl7HqOVzzAokl1L9IGNO3xnGsrBBKOCIOOWemjEhf6WEHDKBx61qyNB2IxiTnj1BvDzR09FySjV1aArFacjyU9MLIZDOKz8GkL6r6xkYyO9R9aAFMKWd1ijyyoixYD-QRveaEK5w22bDmxRwHkMk2lEaftonp6nURiebMX7GtcvRrqwDxGOpzoeXP_4",
  LOGO_ICON: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgs4cSvmPk9fDlPyQ3W2SjWzJYVLRgc_42g4Ui2IshBoTHxyC25fTPUX8K3rGYJwQk7ZLCjoNhnaBrmsLAouPkWz7i0AFl-eh7K0qnGSzjSO5R-9CwldadG_t9g4s4uUee1bXfYxF8F4h7jWa_mKvWp0VFachAljfbY6g5fqVYA21mM43NpiWlgn5PoZC6PiwyetElIkasZSSGHvqvkmVPm-Qx-FEyo9-DXP1bUNZtwyf8XUNOEER8vP3hay0oWGwzZRuFAveCA"
};
