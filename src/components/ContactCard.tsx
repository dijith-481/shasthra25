import { ContactIcon } from "@/components/Ui/Icons";
import { mixColors } from "@/utils/colorUtils";

interface ContactType {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactCardProps {
  contacts: ContactType[];
  color: string | undefined;
}

export const ContactCard = ({ contacts, color }: ContactCardProps) => {
  return (
    <div className="flex  items-center my-2 flex-wrap gap-2 justify-center w-full">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="  rounded-3xl w-full p-6 max-w-96 "
          style={{
            backgroundColor: mixColors(color, "#ffffff", 0.5, 0.7),
          }}
        >
          <div className="flex items-center mb-4">
            <div
              className="w-12 h-12  rounded-full border border-black/5 flex items-center justify-center mr-4"
              style={{ backgroundColor: color + "80" }}
            >
              <ContactIcon />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{contact.name}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <strong className="w-20 text-gray-600">Email:</strong>
              <a
                href={`mailto:${contact.email}`}
                className="text-blue-500 hover:underline mix-blend-difference text-sm"
                style={{ color: color }}
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center">
              <strong className="w-20 text-gray-600">Phone:</strong>
              <a
                href={`tel:${contact.phone}`}
                className="text-blue-500 hover:underline mix-blend-difference"
                style={{ color: color }}
              >
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
