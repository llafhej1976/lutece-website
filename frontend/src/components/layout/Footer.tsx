export default function Footer() {
  return (
    <footer className="border-t border-[#262626] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-mono text-sm font-bold mb-2">
            <span className="text-[#00d9ff]">LUTECE</span>
            <span className="text-[#a3a3a3]">.consulting</span>
          </div>
          <p className="text-xs text-[#a3a3a3] max-w-xs">
            LUTECE Consulting SAS — Architecte IA Senior<br />
            Paris / Île-de-France · Hybride
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="text-white font-semibold mb-3">Contact</div>
            <a href="mailto:loic.lafhej@lutece-consulting.com" className="text-[#a3a3a3] hover:text-[#00d9ff] block text-xs">
              loic.lafhej@lutece-consulting.com
            </a>
            <span className="text-[#a3a3a3] text-xs">+33 6 52 56 11 33</span>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Liens</div>
            <a href="https://www.linkedin.com/in/lafhej-loic-15a79a3" target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] hover:text-[#00d9ff] block text-xs mb-1">
              LinkedIn
            </a>
            <a href="https://github.com/llafhej1976" target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] hover:text-[#00d9ff] block text-xs">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#262626]">
        <p className="text-xs text-[#a3a3a3]">
          © {new Date().getFullYear()} LUTECE Consulting SAS · Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
