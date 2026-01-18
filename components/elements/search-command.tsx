"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  FileCode,
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  Laptop,
  Moon,
  Sun,
  LayoutDashboard,
  Home,
  Mail,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { SearchResults } from "@/types/search";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

interface SearchCommandProps {
  data: SearchResults;
}

export function SearchCommand({ data }: SearchCommandProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden" 
        id="search-trigger"
        aria-label="Open search"
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
              <User className="mr-2 h-4 w-4" />
              <span>About</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/certifications"))}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Certifications</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/palette"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Palette</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {data.projects?.length > 0 && (
            <CommandGroup heading="Projects">
              {data.projects.map((project) => (
                <CommandItem
                  key={project._id}
                  onSelect={() => runCommand(() => router.push(`/projects/${project.slug}`))}
                  value={project.name + " " + project.description + " " + project.technologies?.join(" ")}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  <span>{project.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {data.experience?.length > 0 && (
            <CommandGroup heading="Experience">
              {data.experience.map((exp) => (
                <CommandItem
                   key={exp._id}
                   onSelect={() => runCommand(() => router.push("/about"))}
                   value={exp.company + " " + exp.position}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>{exp.company} - {exp.position}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

           {data.certifications?.length > 0 && (
            <CommandGroup heading="Certifications">
              {data.certifications.map((cert) => (
                <CommandItem
                   key={cert._id}
                   onSelect={() => runCommand(() => router.push("/certifications"))}
                   value={cert.title + " " + cert.company}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>{cert.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {data.links?.length > 0 && (
            <CommandGroup heading="Links">
              {data.links.map((link) => (
                <CommandItem
                  key={link._id}
                  onSelect={() => runCommand(() => window.open(link.url, "_blank"))}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <span>{link.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Actions">
             <CommandItem
              onSelect={() =>
                runCommand(() => {
                  navigator.clipboard.writeText("harshilmalhotra2002@gmail.com"); 
                  toast.success("Email copied to clipboard");
                })
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>Copy Email</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
