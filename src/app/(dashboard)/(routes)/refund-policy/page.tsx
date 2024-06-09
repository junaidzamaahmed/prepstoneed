import React from "react";

export default function Page() {
  return (
    <div>
      <div className="bg-primary text-center">
        <h4 className="text-5xl font-bold text-white py-10">Refund Policy</h4>
      </div>
      <div className="container py-10">
        <p>
          At Prepstone Education, we strive to provide high-quality educational
          services and ensure our students&apos; satisfaction. We understand
          that circumstances may change, and we want to be transparent about our
          refund policy:
        </p>
        <h6 className="font-bold my-2">Eligibility for Refund</h6>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Course Cancellation:</span> If Prepstone
            Education cancels a course before it starts, you will receive a full
            refund of the course fee paid.
          </li>
          <li>
            <span className="font-bold">Withdrawal Before Course Start:</span>{" "}
            If you withdraw from a course before it begins, you are entitled to
            a full refund, minus a processing fee of 40% of the course fee.
          </li>
          <li>
            <span className="font-bold">Withdrawal After Course Start:</span>{" "}
            Due to the nature of our educational services, refunds are generally
            not provided after the course has commenced. However, we may
            consider special circumstances on a case-by-case basis within 24
            Hours.
          </li>
          <li>
            <span className="font-bold">Technical Issues:</span> In the rare
            event of significant technical issues that prevent you from
            accessing course materials or participating in live sessions, a
            partial or full refund may be considered, depending on the extent of
            the disruption.
          </li>
        </ul>
        <br />
        <h6 className="font-bold my-2">How to Request a Refund:</h6>
        <p>
          To request a refund, please submit a written request via email to
          [email protected] Include the following information:
        </p>
        <ul className="list-disc list-inside">
          <li>Your full name</li>
          <li>Course name</li>
          <li>Reason for refund request</li>
        </ul>
        <h4 className="text-xl font-bold mb-2 mt-6">Refund Processing:</h4>
        <p>
          Refund requests will be reviewed within 7 business days. If your
          request is approved, the refund will be processed using the original
          payment method within 14 business days.
        </p>{" "}
        <h4 className="text-xl font-bold mb-2 mt-6">Non-Refundable Items:</h4>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Registration Fees:</span> Registration
            fees are non-refundable.
          </li>
          <li>
            <span className="font-bold">Course Materials:</span> The cost of
            course materials, including textbooks and online resources, is
            non-refundable.
          </li>
          <li>
            <span className="font-bold">Individual Tutoring:</span> Fees paid
            for individual tutoring sessions are non-refundable.
          </li>
        </ul>
        <h4 className="text-xl font-bold mb-2 mt-6">Exceptions:</h4>
        <p>
          Prepstone Education reserves the right to make exceptions to this
          policy in extenuating circumstances, such as medical emergencies or
          unforeseen events. These cases will be handled on an individual basis.
        </p>
        <h4 className="text-xl font-bold mb-2 mt-6">Contact Us:</h4>
        <p>
          If you have any questions or concerns regarding our refund policy,
          please do not hesitate to contact us at <br />{" "}
          support@prepstoneedbd.com
        </p>
        <br />
        <p className="font-bold">
          By enrolling in a Prepstone Education course, you acknowledge that you
          have read and understood this refund policy.
        </p>
      </div>
    </div>
  );
}
