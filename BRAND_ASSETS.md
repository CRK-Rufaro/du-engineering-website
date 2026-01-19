# DU Engineering - Brand Assets Reference

## Product Certification Logos (Download Sources)

### Inverter Brands

| Brand | Download Source | Format |
|-------|----------------|--------|
| **Sunsynk** | [Brandfetch](https://brandfetch.com/sunsynk.com) | SVG, PNG |
| **Luxpower** | [Official Site](https://luxpowertek.co.za/) | Contact for assets |
| **Deye** | [Official Brand Resources](https://www.deyeinverter.com/download/company-documents-brand-resources/) | PNG (transparent), PDF vector |
| **Huawei** | [Huawei Solar](https://solar.huawei.com/) | Contact for assets |

### Electrical Brands

| Brand | Download Source | Format |
|-------|----------------|--------|
| **CBI-electric** | [CBI Website](https://cbi-lowvoltage.co.za/) | Contact for assets |

## Qualification/Certification Logos

| Certification | Download Source | Notes |
|--------------|-----------------|-------|
| **PV Green Card** | [pvgreencard.co.za](https://pvgreencard.co.za/) | SAPVIA programme |
| **SAPVIA** | [sapvia.co.za](https://sapvia.co.za/) | Member logo available to members |
| **Red Seal** | [QCTO](https://www.qcto.org.za/) | National trade certification |

## Logo File Structure

Place downloaded logos in:
```
public/
  logos/
    sunsynk.svg (or .png)
    luxpower.svg
    deye.svg
    huawei.svg
    cbi.svg
    sapvia.svg
    red-seal.svg
    pv-greencard.svg
```

## Usage in Code

The brand logos are referenced in:
- `src/data/projects.js` - `brands` and `certifications` arrays
- `src/pages/Home.jsx` - Brands section

Once logos are added to `/public/logos/`, update the components to use:
```jsx
<img src="/logos/sunsynk.svg" alt="Sunsynk" className="brand-logo" />
```

## Reference: Eleksol (Partner Company)

Eleksol Solar is a partner company based in Klerksdorp. Reference their branding at:
- Website: https://www.eleksolsolar.com/
- Sunsynk Master Installer status
- Similar brand partnerships

## Notes

- Always use official logos from brand sources
- Prefer SVG format for scalability
- PNG with transparent background as fallback
- Ensure proper licensing/permission for logo usage
