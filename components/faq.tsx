import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const faqs = [
  {
    question: "What areas do you serve for electrical engineering services?",
    answer:
      "We primarily serve Jamshedpur and surrounding areas in Jharkhand for on-site electrical engineering services. For larger projects, we can extend our services throughout the state with proper planning and coordination.",
  },
  {
    question: "How long does it typically take to develop a custom website?",
    answer:
      "The timeline for website development varies based on complexity. A basic brochure website typically takes 2-4 weeks, while more complex e-commerce or web applications can take 6-12 weeks. We provide a detailed timeline after our initial consultation.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer various support packages tailored to your needs. These can include maintenance contracts for electrical systems, website hosting and updates, IT support agreements, and ongoing digital marketing services. We'll discuss these options during the project planning phase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including bank transfers, UPI payments, and checks. For larger projects, we typically break payments into milestones. All payment terms will be clearly outlined in our proposal before work begins.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about our services and processes.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
