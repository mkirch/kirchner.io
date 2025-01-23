import { ContactTemplate } from '@repo/email/templates/contact';

const ExampleContactEmail = () => (
  <ContactTemplate
    name="Johannes Dieaux"
    email="johannes.dieaux@kirchner.io"
    message="Hey - I'm interested in..."
  />
);

export default ExampleContactEmail;
