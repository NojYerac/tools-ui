We have a java project which identifies if new  CVE are reported for any of our support SAST rulepack. This way we know  to go and create an CVE rule.
We should step back rethink the goal and implement a new solution.

- log to fluentd (see dispenser for example)


+ Get a list of CVEs
  + 'Relevant' - CVEs for APIs we support
  + How to give the user the ability to control what CVE results are returned?
+ UI to show results
  + CVE status new/in_progress/ignore/human_written/deployed
    + Discovered = New CVE - never been looked at
    + Needed = Looked at and needs a rule
    + Ignored =  Looked at and does not need a rule
    + Written = Rule written for by a Rulepack Engineer - Human reported
    + Covered = rule exists in rulepack, provide id, name, etc... - Pulled from XML
  + Possibly automate hashing jars?
  + Auto generate CVE xml rule copy/paste textarea
  + link to location
  + search
    + by_state
    + framework
    + CVE id(title)
    + by confidence & severity
    + list of hashes
  + filter
  + database of pre-hashed jar files <-- as helper for rulepack author (probably can't be completely automated)

Jesus's Notes:
+ Why not go from the jar sig to search for CVEs? Why not the other way.
+ dependency hash map to keywords map to CVE


**Example Rule:**
```xml
<unpatched_library_rule confidence="High" id="5836-1248-5CE8-F210-FB9E-0CAF-CC3C-4683" severity="High">
  <category>Platform.UnpatchedLibrary</category>
  <!-- spring-webmvc-2.5.jar -->
  <file_hash>1D2C500F2CDF5DAFAC14AB0BB5C3AF34B3CBABA4D3B7EE1AAB47F31ADEA2CE7647A21823892CCC977C2DC00C7646C13CCDEED922D25B3D6B5FC13E2B3D91D386</file_hash>
  <!-- spring-webmvc-2.5.1.jar -->
  <file_hash>2E7816BF80713C3A680EB0A9AD4997A3509D9ADB23EB9198B27DCD2610B9D9923372A3A47351B174BBF55C002D1D115848C27F147694FF1C0F1F08C3CBCEE05F</file_hash>
  <!-- spring-webmvc-2.5.2.jar -->
  <file_hash>82ACAA832C6229CF5C4A12A0734BC05E7515AD2D8A2A52FC8B183142D5C517C2928948DC883577DFA49EF223B8EB23923219F3AE21677A1A98C4EDCAF515061A</file_hash>
  <!-- spring-webmvc-2.5.3.jar -->
  <file_hash>00B20882AA824AC73188DC65406CEC7F3C88706F2477AE37139154E947936C69BA33801739EA1BE2BED274834F74F193A0CF981478891674E573F777527E7686</file_hash>
  <!-- spring-webmvc-2.5.4.jar -->
  <file_hash>231A78319BD31D935880FE31B9474E65452EBDE6719B7649FDDA1257CDDA889B07B2717A7B2108B0DF71557F91F8FC45D76B64CF0AEE92032953C25DAA892911</file_hash>
  <!-- spring-webmvc-2.5.5.jar -->
  <file_hash>B2387F215A6283D0B1D08E22953344833EB5588A89CC90FB3CFDDB82E76ED3C0826842C05EC6A15EC3909FE202092ED91D853E6F8B993A8E724C42FEE0C7AAA1</file_hash>
  <!-- spring-webmvc-2.5.6.jar -->
  <file_hash>0703508307A1F797F73010598A7ACF71541BB35EE1FBA9B2622D33B31C5E81F5FE6533A21A6A57015FF9711A01F5A27F0AA9C9830D8C6EADC86505E1516EF813</file_hash>
  <!-- spring-webmvc-3.0.0.RELEASE.jar -->
  <file_hash>724E9260320247C5595B7BE76EB41392E6130EBFD1D91119BD6A03DDB89D8ABBD02BC36859A002C1DF9E96055ACACCC15976AF1537D30D0612F0DF33FD3A917F</file_hash>
  <!-- spring-webmvc-3.0.1.RELEASE.jar -->
  <file_hash>FC62246E372446DB5B35A1D0580F016CE75BE028089A526759AC12F5B5DAAB07CE2AE6C504BAF5D903A49E9D4E2CAC8D098C00B63EA37FF9A28015C1575BA59E</file_hash>
  <!-- spring-webmvc-3.0.2.RELEASE.jar -->
  <file_hash>2BBA17CA4ECA71701616D10FA6EC0F33342E43C180A9FFA7F1AC151481ADC05DF77D21D1ECBD5CAFAE8954B68022C160E5DFE60D689AFE12FE26FA6DAF96ECC7</file_hash>
  <reference>
    <kind>Link</kind>
    <title>CVE-2010-1622</title>
    <location>http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2010-1622</location>
  </reference>
</unpatched_library_rule>
```

## Feature requests:
  - Add alert feature
    - Save filters that show CVEs that need attention
    - Run filter on app loaded
    - Display Tab for TODOs
  - Make hashes unique
    - Hashes digest and title should each be unique
    - Hashes should be pre-populated with suggested digest based on title
  - Allow Rules to be saved online as WIP
    - Updating rules must be reworked to allow for non-deployed rules
