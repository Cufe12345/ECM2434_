# Project Security Policy for ECM2434 #

This document outlines the security policy for the ECM2434 project, a web application utilizing a Django backend and a React.js frontend.
Our commitment is to protect our users' data and maintain the integrity and confidentiality of our application through rigorous security measures.

## Secure Coding Practices ##

- Code Reviews: All code contributions must undergo a peer review process before being merged into the main branch. This helps identify potential security flaws or vulnerabilities early in the development cycle.
  
- Static Analysis: Utilize static analysis tools to detect security vulnerabilities, coding flaws, and other potential security risks in both the Django and React.js codebases.
  
- Secure Development Training:
-   Understand :[https://owasp.org/Top10/A00_2021_How_to_use_the_OWASP_Top_10_as_a_standard/].
-   Prevent: [https://attack.mitre.org/]
 
## Dependency Management ##
We Regularly update all dependencies to their latest secure versions to mitigate vulnerabilities. 
Periodic security audits of dependencies are also made with tools designed for Python (e.g., safety) and JavaScript (e.g., npm audit) ecosystems.
We comit to review and remove unnecessary or unused dependencies to minimize the potential attack surface.

## Vulnerability Reporting ##
Public Reporting Guidelines: Clear guidelines are in the repository's README.md on how to report security vulnerabilities, including a dedicated contact email.
Responsible Disclosure Policy: Responsible disclosure can be made here (e.g., securityecm2434@proton.me) for researchers to report vulnerabilities and establish a timeline for acknowledgment and remediation.

## Data Protection ##
We Ensure that all sensitive data, both at rest and in transit, is encrypted using strong encryption standards.
Strict access controls made for both the application and its data, ensuring that only authorized personnel have access based on the principle of least privilege.

## Compliance ##
We Ensure compliance with relevant legal and regulatory requirements regarding data protection and privacy, such as GDPR, through regular audits and adjustments to security practices as necessary.

## Review and Update ##
This security policy will be reviewed and updated on a bi-annual basis or in response to significant changes in the threat landscape or project architecture, to ensure it remains effective and relevant.

