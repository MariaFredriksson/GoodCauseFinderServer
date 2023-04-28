/**
 * Projects controller.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class ProjectsController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const data = {
        projects: [
          {
            title: 'Förbättra tillgängligheten till psykologisk vård',
            description: 'Projektet syftar till att förbättra tillgängligheten till psykologisk vård för personer som lider av psykiska problem. Genom att erbjuda kostnadsfri psykologisk vård online kan vi hjälpa fler personer att ta hand om sin mentala hälsa.',
            organization: 'Mental Health Foundation',
            id: 'mhfp001'
          },
          {
            title: 'Stärka kvinnors entreprenörskap',
            description: 'Projektet syftar till att stärka kvinnors entreprenörskap genom att erbjuda utbildning, mentorprogram och finansiellt stöd till kvinnliga entreprenörer. Vi tror att detta kan bidra till att minska den ekonomiska ojämlikheten mellan könen.',
            organization: 'Women\'s Entrepreneurship Association',
            id: 'wea001'
          },
          {
            title: 'Bistånd till drabbade av jordbävning',
            description: 'Projektet syftar till att ge akut bistånd till personer som drabbats av en jordbävning. Vi kommer att tillhandahålla mat, vatten, medicin och andra nödvändigheter till de drabbade och arbeta tillsammans med lokala organisationer för att återuppbygga skadade hem och infrastruktur.',
            organization: 'International Red Cross',
            id: 'irc001'
          },
          {
            title: 'Bekämpa diabetes genom forskning',
            description: 'Projektet syftar till att bekämpa diabetes genom forskning och utveckling av nya behandlingsmetoder. Vi tror att detta kan bidra till att minska antalet personer som lider av diabetes och förbättra livskvaliteten för dem som har sjukdomen.',
            organization: 'Diabetes Research Foundation',
            id: 'drf001'
          },
          {
            title: 'Minska könsbaserat våld',
            description: 'Projektet syftar till att minska könsbaserat våld genom utbildning, kampanjer och stöd till offer för våld. Vi tror att detta kan bidra till att skapa en mer jämställd samhälle och minska antalet personer som utsätts för våld på grund av sitt kön.',
            organization: 'Gender Equality Now',
            id: 'gen001'
          },
          {
            title: 'Bistånd till flyktingar från krigszoner',
            description: 'Projektet syftar till att ge akut bistånd till flyktingar från krigszoner. Vi kommer att tillhandahålla mat, vatten, medicin och andra nödvändigheter till flyktingarna och arbeta tillsammans med lokala organisationer för att hjälpa dem att återintegreras i samhället.',
            organization: 'Refugee Aid International',
            id: 'rai001'
          },
          {
            title: 'Främja sexuell och reproduktiv hälsa i låginkomstländer',
            description: 'Projektet syftar till att främja sexuell och reproduktiv hälsa i låginkomstländer genom utbildning och tillgång till preventivmedel. Vi tror att detta kan bidra till att minska antalet oönskade graviditeter och förbättra hälsan för kvinnor och barn.',
            organization: 'International Planned Parenthood Federation',
            id: 'ippf001'
          }
        ]
      }

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
