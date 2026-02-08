import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Penn Rock Admin')
    .items([
      // 1. DASHBOARD SHORTCUTS
      S.listItem()
        .title('🚨 Active Inventory')
        .child(
          S.documentList()
            .title('Active Inventory')
            .filter('_type == "inventory" && status != "sold"')
        ),

      S.listItem()
        .title('💰 Sold Archive')
        .child(
          S.documentList()
            .title('Sold Trucks')
            .filter('_type == "inventory" && status == "sold"')
        ),

      S.divider(),

      // 2. BROWSE BY MAKE (The New "Filter")
      S.listItem()
        .title('🚛 Browse by Make')
        .child(
          S.list()
            .title('Manufacturers')
            .items([
              // We hardcode the popular ones for instant access
              S.listItem().title('Kenworth').child(
                S.documentList().title('Kenworths').filter('_type == "inventory" && make == "Kenworth"')
              ),
              S.listItem().title('Peterbilt').child(
                S.documentList().title('Peterbilts').filter('_type == "inventory" && make == "Peterbilt"')
              ),
              S.listItem().title('Mack').child(
                S.documentList().title('Macks').filter('_type == "inventory" && make == "Mack"')
              ),
              S.listItem().title('Ford').child(
                S.documentList().title('Fords').filter('_type == "inventory" && make == "Ford"')
              ),
              S.listItem().title('Freightliner').child(
                S.documentList().title('Freightliners').filter('_type == "inventory" && make == "Freightliner"')
              ),
              S.listItem().title('International').child(
                S.documentList().title('Internationals').filter('_type == "inventory" && make == "International"')
              ),
              // Catch-all for others
              S.listItem().title('Other Makes').child(
                 S.documentList().title('Other Makes').filter('_type == "inventory" && !(make in ["Kenworth", "Peterbilt", "Mack", "Ford", "Freightliner", "International"])')
              ),
            ])
        ),

      // 3. BROWSE BY CATEGORY
      S.listItem()
        .title('📂 Browse by Category')
        .child(
          S.list()
            .title('Categories')
            .items([
              S.listItem().title('Dump Trucks').child(
                S.documentList().title('Dump Trucks').filter('_type == "inventory" && category == "dump-trucks"')
              ),
              S.listItem().title('Day Cabs').child(
                 S.documentList().title('Day Cabs').filter('_type == "inventory" && category == "day-cabs"')
              ),
              S.listItem().title('Trailers').child(
                 S.documentList().title('Trailers').filter('_type == "inventory" && category == "trailers"')
              ),
              S.listItem().title('Heavy Equipment').child(
                 S.documentList().title('Heavy Equipment').filter('_type == "inventory" && category == "heavy-equipment"')
              ),
            ])
        ),

      S.divider(),

      // 4. THE MASTER LIST (Native Search & Sort)
      S.documentTypeListItem('inventory').title('All Everything'),
    ])