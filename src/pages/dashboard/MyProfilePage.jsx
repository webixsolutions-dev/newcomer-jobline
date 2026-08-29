import { useState } from "react";
import { HiOutlineXMark, HiOutlinePlus } from "react-icons/hi2";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import ProfileCompletenessBar from "../../components/dashboard/ProfileCompletenessBar";
import ResumeUploadCard from "../../components/dashboard/ResumeUploadCard";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useDashboardData } from "../../context/DashboardDataContext";

function ExperienceEditor({ entries, onChange }) {
  function updateEntry(id, field, value) {
    onChange(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }

  function addEntry() {
    onChange([
      ...entries,
      {
        id: `exp-${Date.now()}`,
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  }

  function removeEntry(id) {
    onChange(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="rounded-xl border border-navy-100 bg-navy-50/30 p-4 space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeEntry(entry.id)}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="Job title"
              value={entry.title}
              onChange={(e) => updateEntry(entry.id, "title", e.target.value)}
            />
            <Input
              label="Company"
              value={entry.company}
              onChange={(e) => updateEntry(entry.id, "company", e.target.value)}
            />
            <Input
              label="Start date"
              type="month"
              value={entry.startDate}
              onChange={(e) => updateEntry(entry.id, "startDate", e.target.value)}
            />
            <Input
              label="End date"
              type="month"
              value={entry.endDate}
              onChange={(e) => updateEntry(entry.id, "endDate", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-navy-800">Description</label>
            <textarea
              value={entry.description}
              onChange={(e) => updateEntry(entry.id, "description", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-navy-200 bg-navy-50/40 px-4 py-3 text-sm text-navy-900 outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-100"
            />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" icon={HiOutlinePlus} onClick={addEntry}>
        Add experience
      </Button>
    </div>
  );
}

function EducationEditor({ entries, onChange }) {
  function updateEntry(id, field, value) {
    onChange(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }

  function addEntry() {
    onChange([
      ...entries,
      {
        id: `edu-${Date.now()}`,
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]);
  }

  function removeEntry(id) {
    onChange(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="rounded-xl border border-navy-100 bg-navy-50/30 p-4 space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeEntry(entry.id)}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="Institution"
              value={entry.institution}
              onChange={(e) => updateEntry(entry.id, "institution", e.target.value)}
            />
            <Input
              label="Degree / Certificate"
              value={entry.degree}
              onChange={(e) => updateEntry(entry.id, "degree", e.target.value)}
            />
            <Input
              label="Start date"
              type="month"
              value={entry.startDate}
              onChange={(e) => updateEntry(entry.id, "startDate", e.target.value)}
            />
            <Input
              label="End date"
              type="month"
              value={entry.endDate}
              onChange={(e) => updateEntry(entry.id, "endDate", e.target.value)}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" icon={HiOutlinePlus} onClick={addEntry}>
        Add education
      </Button>
    </div>
  );
}

const MyProfilePage = () => {
  const { profile, updateProfile } = useDashboardData();
  const [personal, setPersonal] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
  });
  const [skills, setSkills] = useState([...profile.skills]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState([...profile.experience]);
  const [education, setEducation] = useState([...profile.education]);
  const [saved, setSaved] = useState(null);

  function addSkill(e) {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills([...skills, trimmed]);
    setSkillInput("");
  }

  function removeSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function saveSection(section) {
    if (section === "personal") updateProfile("personal", personal);
    if (section === "skills") updateProfile("skills", skills);
    if (section === "experience") updateProfile("experience", experience);
    if (section === "education") updateProfile("education", education);
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="My Profile"
        subtitle="Keep your profile up to date so employers can find you."
      />
      <ProfileCompletenessBar />

      <Card hover={false} className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-navy-900">Personal Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full name"
            value={personal.fullName}
            onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={personal.email}
            onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
          />
          <Input
            label="Phone"
            value={personal.phone}
            onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
          />
          <Input
            label="Location"
            value={personal.location}
            onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => saveSection("personal")}>
            Save Changes
          </Button>
          {saved === "personal" && (
            <span className="text-sm font-semibold text-teal-700">Saved!</span>
          )}
        </div>
      </Card>

      <Card hover={false} className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-navy-900">Resume</h2>
        <ResumeUploadCard
          filename={profile.resumeFilename}
          onUpload={(filename) => updateProfile("resume", { filename })}
          onRemove={() => updateProfile("resume", { filename: null })}
        />
      </Card>

      <Card hover={false} className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-navy-900">Skills</h2>
        <form onSubmit={addSkill} className="flex gap-2">
          <Input
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            containerClassName="flex-1"
          />
          <Button type="submit" variant="outline" size="sm" className="self-end">
            Add
          </Button>
        </form>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800"
            >
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                <HiOutlineXMark className="text-base" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => saveSection("skills")}>
            Save Changes
          </Button>
          {saved === "skills" && (
            <span className="text-sm font-semibold text-teal-700">Saved!</span>
          )}
        </div>
      </Card>

      <Card hover={false} className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-navy-900">Work Experience</h2>
        <ExperienceEditor entries={experience} onChange={setExperience} />
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => saveSection("experience")}>
            Save Changes
          </Button>
          {saved === "experience" && (
            <span className="text-sm font-semibold text-teal-700">Saved!</span>
          )}
        </div>
      </Card>

      <Card hover={false} className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-navy-900">Education</h2>
        <EducationEditor entries={education} onChange={setEducation} />
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => saveSection("education")}>
            Save Changes
          </Button>
          {saved === "education" && (
            <span className="text-sm font-semibold text-teal-700">Saved!</span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MyProfilePage;
